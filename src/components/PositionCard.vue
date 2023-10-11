<template>
  <AppContentCard class="position-card">
    <div class="position-card-icon">
      <AppIcon :name="IconName.ADD_BIG" />
    </div>
    <div class="position-card-content">
      <h3 class="position-card-content-title">
        Add new position
      </h3>
      <p class="position-card-content-subtitle">
        Deposit single or mixed assets and get easy yield.
      </p>
    </div>
    <div class="position-card-footer">
      <router-link
        class="button is-primary-accent is-small go-to-marget-button"
        :to="{ name: RouteName.MARKET }"
      >
        Go to market
      </router-link>
    </div>
  </AppContentCard>
</template>

<script setup lang="ts">
  import AppContentCard from '@/components/utils/AppContentCard.vue';
  import AppIcon from '@/components/utils/AppIcon.vue';
  import { IconName } from '@/types/IconName';
  import { RouteName } from '@/types/RouteName';
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .position-card {
    display: flex;
    align-items: center;
    width: 256px;
    text-align: center;
    padding: utils.spacing-unit(12) utils.spacing-unit(4) utils.spacing-unit(6);

    .position-card-icon {
      width: 64px;
      height: 64px;
    }

    .position-card-footer {
      width: 100%;
    }

    .go-to-marget-button {
      width: 100%;
    }
  }

  .position-card-content {
    margin-bottom: utils.spacing-unit(12);

    .position-card-content-title {
      @include utils.apply-styles(utils.$text-body-medium);
      margin-bottom: utils.spacing-unit(2);
    }

    .position-card-content-subtitle {
      @include utils.apply-styles(utils.$text-body-small);
      color: utils.$color-navi;
    }
  }
</style>
