<template>
  <router-link
    class="the-menu-nav"
    :to="props.to"
  >
    <span
      v-if="$slots.icon"
      class="the-menu-nav-icon"
    >
      <slot name="icon" />
    </span>
    <transition name="opacity-transition">
      <span
        v-if="props.isExpanded"
        class="the-menu-nav-text"
      >
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';

  interface Props {
    to: RouteLocationRaw;
    isExpanded: boolean;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  $border-width: 1px;

  .the-menu-nav {
    position: relative;
    padding: (utils.spacing-unit(4) - $border-width);
    display: flex;
    align-items: center;
    text-decoration: none;
    color: utils.$color-gray;
    fill: utils.$color-gray;
    transition-duration: utils.$transition-duration;
    transition-property: color, fill, background-color, border, border-radius;
    @include utils.apply-styles(utils.$text-body);
    border: $border-width solid transparent;
    outline: none;

    &::before {
      content: '';
      position: absolute;
      width: 2px;
      background-color: utils.$color-bloom;
      height: 100%;
      left: -$border-width;
      top: 0;
      opacity: 0;
      transition: opacity utils.$transition-duration;
    }

    .the-menu-nav-icon {
      margin-right: utils.spacing-unit(2);
      width: 24px;
      height: 24px;
    }

    .the-menu-nav-text {
      white-space: nowrap;
    }

    &:hover {
      color: utils.$color-gray;
      fill: utils.$color-gray;
      background-color: utils.$color-mist;
      border-color: utils.$color-mist;
    }

    &:active {
      color: utils.$color-primary-dark;
      fill: utils.$color-primary-dark;
      background-color: utils.$color-mist;
      border-color: utils.$color-mist;
    }

    &.router-link-active {
      color: utils.$color-primary-dark;
      fill: utils.$color-primary-dark;
      background-color: utils.$color-mist;
      border-color: utils.$color-mist;

      &::before {
        opacity: 1;
      }
    }

    &:focus-visible {
      border-color: utils.$color-focus;
      border-radius: 8px;
    }
  }
</style>
