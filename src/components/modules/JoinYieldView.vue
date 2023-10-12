<template>
  <div class="join-yield-view">
    <div class="joinContainer">
      <div class="row px-5 mobOnlyFlex join-yield-top">
        <div class="join-yield-top-title-container">
          <div class="me-md-3 me-xl-4 ms-md-4 ms-lg-2 joinYieldLogo">
            <h2 class="">JOIN_<span>YIELD</span></h2>
          </div>

          <AppSelect
            id="market-select"
            v-model="rootStore.selectedMarket"
            class="join-yield-view-market-select"
            :options="chainOptions"
            :text-by="(option:any) => getMarketLabel(option)"
          >
            <template #control-icon>
              <AppIcon :name="getMarketIcon(rootStore.selectedMarket)" />
            </template>
            <template #option-icon="{ option }">
              <AppIcon :name="getMarketIcon(option)" />
            </template>
          </AppSelect>

          <AccountCenter class="the-menu-controls ms-auto d-none d-sm-block" />
          
        </div>
      </div>
      <AppNavTabs class="join-yield-tabs mx-4">
        <AppNavTab :route-name="RouteName.MY_POSITIONS">
          My Positions
        </AppNavTab>
        <AppNavTab :route-name="RouteName.MARKET">
          Market
        </AppNavTab>
      </AppNavTabs>
    </div>

    <router-view #="{ Component }">
      <transition
        name="opacity-transition"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { RouteName } from '@/types/RouteName';
  import AccountCenter from '@/components/AccountCenter.vue';
  import { useRootStore } from '@/stores/RootStore';
  import AppSelect from '@/components/utils/AppSelect/AppSelect.vue';
  import AppNavTab from '@/components/utils/AppNavTab.vue';
  import AppNavTabs from '@/components/utils/AppNavTabs.vue';
  import AppIcon from '@/components/utils/AppIcon.vue';
  import { IconName } from '@/types/IconName';
  import { Market } from '@/types/Market';

  const LABEL_BY_MARKET: Record<Market, string> = {
    [Market.ARBITRUM]: 'Arbitrum Market',
    [Market.POLYGON]: 'Polygon Market',
    [Market.ETHEREUM]: 'Ethereum Market',
  };

  const ICON_BY_MARKET: Record<Market, IconName> = {
    [Market.ARBITRUM]: IconName.ARBITRUM_LOGO,
    [Market.POLYGON]: IconName.POLYGON_LOGO,
    [Market.ETHEREUM]: IconName.ETHEREUM_LOGO,
  };

  const rootStore = useRootStore();

  const chainOptions = ref<Market[]>([
    Market.ARBITRUM,
    // Market.POLYGON,
    // Market.ETHEREUM,
  ]);

const getMarketLabel: any = (market: Market) => LABEL_BY_MARKET[market];
const getMarketIcon: any = (market: Market) => ICON_BY_MARKET[market];
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;
  .join-yield-view {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

  .join-yield-view-market-select {
    min-width: 170px;
  }

  .join-yield-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 19px;
    padding: 0 utils.spacing-unit(2);

    .join-yield-top-title-container {
      display: flex;
      align-items: center;
    }
  }

  .join-yield-account-center {
    @include utils.touch {
      display: none;
    }
  }

  .join-yield-title {
    @include utils.apply-styles(utils.$text-title);
    margin-right: utils.spacing-unit(4);
  }

  .join-yield-title-ending {
    color: utils.$color-primary;
  }

  .join-yield-tabs {
    margin-bottom: utils.spacing-unit(8);
  }
}
</style>
