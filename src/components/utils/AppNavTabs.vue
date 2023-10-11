<template>
  <ul class="nav  nav-tabs mx-lg-5 mx-md-5 mb-2" role="tablist">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app-nav-tabs {
    display: flex;
    border-bottom: 1px solid utils.$color-gray-light;
  }
</style>
