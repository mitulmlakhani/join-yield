<template>
  <div class="app-content-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app-content-card {
    display: flex;
    flex-direction: column;
    background-color: utils.$color-white;
    box-shadow: utils.$shadow-2;
    border-radius: 8px;
    padding: utils.spacing-unit(4) utils.spacing-unit(4) utils.spacing-unit(6);
  }
</style>
