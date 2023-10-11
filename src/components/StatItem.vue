<template>
  <dl class="stat-item">
    <dt class="stat-item-title">
      <slot name="title" />
    </dt>
    <dd class="stat-item-value">
      <span class="stat-item-value-currency">$</span>
      <span class="stat-item-value-amount">
        --
      </span>
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .stat-item {
    display: flex;
    flex-direction: column;

    .stat-item-title {
      color: utils.$color-navi;
    }

    .stat-item-value-currency {
      @include utils.apply-styles(utils.$text-body-medium);
      color: utils.$color-navi;
    }

    .stat-item-value-amount {
      @include utils.apply-styles(utils.$text-amount);
    }
  }
</style>
