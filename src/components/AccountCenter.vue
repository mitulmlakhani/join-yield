<template>
  <div v-if="rootStore.isWalletConnected" v-outer-click="close" class="account-center">
    <AppDropdownControl ref="control" class="account-center-control" :is-open="isOpen" :tabindex="isOpen ? -1 : 0"
      @focus="open" @mousedown.stop.prevent="toggle" @keydown.tab="close" @keydown.esc="close">
      <template #control-icon>
        <AppIcon class="account-center-avatar" :name="IconName.AVATAR" />
      </template>
      {{ walletAddress }}
    </AppDropdownControl>
    <transition name="opacity-transition">
      <div v-if="isOpen" class="account-center-flyout">
        <div class="account-center-wallet-info">
          <AppIcon class="account-center-wallet-info-avatar" :name="IconName.AVATAR" />
          <span class="account-center-wallet-info-address">
            {{ walletAddress }}
          </span>
          <AppCopyTextButton :text="rootStore.walletAddress" />
        </div>
        <div class="account-center-network-field">
          <div class="account-center-network-field-label">Network</div>
          <AppSelect id="network-select" v-model="rootStore.selectedChain" :options="chainOptions"
            :text-by="option => getChainLabel(option as Chain)" @update:model-value="switchNetwork($event as Chain)" />
        </div>
        <div class="account-center-actions">
          <button class="button is-primary is-small account-center-actions-button" type="button" @click="connectWallet">
            Switch wallet
          </button>
          <button class="button is-secondary is-icon is-small" type="button" @click="rootStore.disconnectWallet()">
            <AppIcon :name="IconName.FLASH_OFF" />
          </button>
        </div>
      </div>
    </transition>
  </div>
  <div v-else>
    <button type="button" class="button is-primary-accent is-small" @click="connectWallet">Connect Wallet</button>
  </div>
</template>

<script setup lang="ts">
import { outerClick } from "@/directives/OuterClick";
import AppDropdownControl from "@/components/utils/AppDropdownControl.vue";
import { useRootStore } from "@/stores/RootStore";
import { computed, reactive, ref, toRefs } from "vue";
import { GeneralHelper } from "@/helpers/GeneralHelper";
import AppIcon from "@/components/utils/AppIcon.vue";
import { IconName } from "@/types/IconName";
import AppCopyTextButton from "@/components/utils/AppCopyTextButton.vue";
import AppSelect from "@/components/utils/AppSelect/AppSelect.vue";
import { INFO_BY_CHAIN } from "@/helpers/constansts/chain";
import { Chain } from "@/types/chain";

interface AccountCenterState {
  isOpen: boolean;
  chainOptions: Chain[];
  walletAddress: string;
}

const rootStore = useRootStore();

const state: AccountCenterState = reactive({
  isOpen: false,
  chainOptions: [
    Chain.ARBITRUM,
    // Chain.POLYGON,
    // Chain.ETHEREUM,
    // Chain.ARBITRUM_GOERLI,
  ],
  walletAddress: computed(() =>
    GeneralHelper.convertToShortValue(rootStore.walletAddress)
  ),
});

const getChainLabel = (chan: Chain) => INFO_BY_CHAIN[chan].label;

const control = ref<InstanceType<typeof AppDropdownControl> | null>(null);

const open = () => {
  if (state.isOpen) {
    return;
  }

  state.isOpen = true;

  if (control.value) {
    control.value.$el.focus();
  }
};

const close = () => {
  if (!state.isOpen) {
    return;
  }

  state.isOpen = false;

  if (control.value) {
    control.value.$el.blur();
  }
};

const toggle = () => {
  (state.isOpen ? close : open)();
};

const connectWallet = async () => {
  await rootStore.connectWallet();
  await switchNetwork(rootStore.selectedChain);
  close();
};

const switchNetwork = (chain: Chain) => {
  close();
  const { id } = INFO_BY_CHAIN[chain];

  rootStore.setChain(id);
};

const vOuterClick = outerClick;

const { walletAddress, isOpen, chainOptions } = toRefs(state);
</script>

<style lang="scss" scoped>
@use "@/styles/utils/index.scss" as utils;

.account-center {
  position: relative;
  color: "black";

  .account-center-avatar {
    border-radius: 50%;
    flex-shrink: 0;
  }

  .account-center-flyout {
    position: absolute;
    width: 216px;
    background-color: utils.$color-white;
    box-shadow: utils.$shadow-1;
    padding: utils.spacing-unit(4) utils.spacing-unit(4) utils.spacing-unit(6);
    border-radius: 8px;
    right: 0;
    top: calc(100% + 5px);
    z-index: 1;
  }
}

.account-center-wallet-info {
  display: flex;
  align-items: center;
  margin-bottom: utils.spacing-unit(4);

  .account-center-wallet-info-avatar {
    margin-right: utils.spacing-unit(2);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .account-center-wallet-info-address {
    margin-right: utils.spacing-unit(2);
    @include utils.apply-styles(utils.$text-body-medium);
  }
}

.account-center-network-field {
  margin-bottom: utils.spacing-unit(4);

  .account-center-network-field-label {
    @include utils.apply-styles(utils.$text-caption);
    color: utils.$color-navi;
    margin-bottom: utils.spacing-unit(1);
  }
}

.account-center-actions {
  display: flex;

  .account-center-actions-button {
    width: 100%;
    margin-right: utils.spacing-unit(1);
  }
}
</style>
