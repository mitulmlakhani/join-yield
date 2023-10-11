<template>
  <li class="nav-item" >
    <RouterLink
      :to="{ name: props.routeName }"
      class="nav-link "
    >
      <slot />
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
  import { RouteName } from '@/types/RouteName';

  interface Props {
    routeName: RouteName;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app-nav-tab {
    padding: utils.spacing-unit(2);
    height: 48px;
    position: relative;

    .app-nav-tab-link {
      padding: utils.spacing-unit(2);
      text-decoration: none;
      color: utils.$color-navi;
      @include utils.apply-styles(utils.$text-body-medium);
      border-radius: 8px;
      border: 1px solid transparent;
      outline: none;
      transition: color utils.$transition-duration, border-color utils.$transition-duration;

      &::before {
        content: '';
        position: absolute;
        height: 2px;
        width: 100%;
        left: 0;
        bottom: -1px;
        background-color: transparent;
        transition: background-color utils.$transition-duration;
      }

      &:focus-visible {
        border-color: utils.$color-focus;
      }

      &.router-link-active,
      &:active {
        color: utils.$color-primary-dark;
      }

      &.router-link-active::before {
        background-color: utils.$color-primary;
      }
    }
  }

  .nav-tabs .nav-item .router-link-active {
    border: 0;
    border-bottom: 3px solid #F30175;
    color: #022051;
    font-weight: 600;
}
</style>
