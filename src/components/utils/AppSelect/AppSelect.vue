<template>
  <div :id="props.id" v-outer-click="close" class="app-select">
    <div class="app-select-control">
      <slot v-bind="controlSlotProps" name="control">
        <!-- example -->
        <AppDropdownControl :id="controlSlotProps.id" ref="control" class="app-select-default-control"
          :tabindex="controlSlotProps.tabindex" :is-open="isOpen" @focus="controlSlotProps.open"
          @mousedown.stop.prevent="controlSlotProps.toggle" @keydown.self.up.prevent="controlSlotProps.onKeyUp"
          @keydown.self.down.prevent="controlSlotProps.onKeyDown"
          @keydown.self.enter.prevent="controlSlotProps.onKeyEnter" @keydown.tab="controlSlotProps.onKeyTab"
          @keydown.esc="controlSlotProps.onKeyEsc">
          <template v-if="$slots['control-icon']" #control-icon>
            <slot name="control-icon" />
          </template>
          {{ modelValue ? props.textBy(modelValue) : modelValue }}
        </AppDropdownControl>
      </slot>
    </div>

    <transition name="opacity-transition" @enter="isActive = true" @after-leave="isActive = false">
      <AppSelectDropdown v-if="isOpen" ref="dropdown" :value="props.modelValue" :options="options" :track-by="trackBy"
        :id-prefix="id" @select="handleSelect" @close="close">
        <template #option="{ option }">
          <slot name="option" :option="option" />
        </template>

        <template v-if="$slots['option-icon']" #option-icon="{ option }">
          <slot :option="option" name="option-icon" />
        </template>

        <template #option-text="{ option }">
          <slot :option="option" name="option-text">
            {{ textBy(option) }}
          </slot>
        </template>
      </AppSelectDropdown>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { outerClick } from '@/directives/OuterClick';
import { computed, reactive, ref, toRefs } from 'vue';
import AppSelectDropdown from '@/components/utils/AppSelect/AppSelectDropdown.vue';
import type { AppSelectValue } from '@/components/utils/AppSelect/app-select';
import AppDropdownControl from '@/components/utils/AppDropdownControl.vue';
import { useRootStore } from '@/stores/RootStore';
import { INFO_BY_CHAIN, CHAIN_BY_HEX } from '@/helpers/constansts/chain';
import { Chain } from '@/types/chain';
import { watch } from 'vue';

const rootStore = useRootStore();

interface Props {
  id: string;
  modelValue?: AppSelectValue | null;
  options?: AppSelectValue[];
  trackBy?: (option: AppSelectValue) => string;
  textBy?: (option: AppSelectValue) => string;
}

interface Emits {
  (event: 'focus'): void;
  (event: 'open'): void;
  (event: 'close'): void;
  (event: 'blur'): void;
  (event: 'update:modelValue', option: AppSelectValue): void;
}

interface AppSelectState {
  isOpen: boolean;
  isActive: boolean;
  tabindex: number;
  controlSlotProps: {
    id: string;
    isOpen: boolean;
    isActive: boolean;
    tabindex: number;
    open: () => void;
    close: () => void;
    toggle: () => void;
    onKeyUp: () => void;
    onKeyDown: () => void;
    onKeyEnter: () => void;
    onKeyTab: () => void;
    onKeyEsc: () => void;
  };
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  trackBy: (option: AppSelectValue | null) => String(option),
  textBy: (option: AppSelectValue | null) => String(option),
});

const emit = defineEmits<Emits>();

const state: AppSelectState = reactive({
  isOpen: false,
  isActive: false,
  tabindex: computed(() => ((state.isOpen || state.isActive) ? -1 : 0)),
  controlSlotProps: computed(() => ({
    id: `${props.id}-control`,
    isOpen: state.isOpen,
    isActive: state.isActive,
    tabindex: state.tabindex,
    open,
    close,
    toggle,
    onKeyUp: () => dropdown.value?.movePointerUp(),
    onKeyDown: () => dropdown.value?.movePointerDown(),
    onKeyEnter: () => dropdown.value?.handleEnterSelection(),
    onKeyTab: close,
    onKeyEsc: close,
  })),
});

// todo: why any?
const control = ref<InstanceType<typeof AppDropdownControl> | null>(null);
const dropdown = ref<InstanceType<typeof AppSelectDropdown> | null>(null);

const open = () => {
  if (state.isOpen) {
    return;
  }

  state.isOpen = true;

  if (control.value) {
    control.value.$el.focus();
  }

  emit('focus');
  emit('open');
};

const close = () => {
  if (!state.isOpen) {
    return;
  }

  state.isOpen = false;

  if (control.value) {
    control.value.$el.blur();
  }

  emit('close');
  emit('blur');
};

const toggle = () => {
  (state.isOpen ? close : open)();
};

const switchNetwork = async (chain: Chain) => {
  const { id } = INFO_BY_CHAIN[chain];

  await rootStore.setChain(id);
};

const handleSelect = async (option: Chain) => {
  close();
  await switchNetwork(option);
  emit('update:modelValue', option);
  return true;
};

watch(() => rootStore.walletState, () => {
  const chainHexId = rootStore.walletState?.chains[0]?.id || "";
  const chainName = CHAIN_BY_HEX[chainHexId];

  if (chainName) {
    emit('update:modelValue', chainName);
  }
});


const vOuterClick = outerClick;

const { isOpen, isActive, controlSlotProps } = toRefs(state);
</script>

<style lang="scss" scoped>
@use '@/styles/utils/index.scss' as utils;

.app-select {
  position: relative;
}
</style>
