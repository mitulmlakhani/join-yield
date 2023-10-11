<template>
  <div class="app-dropdown-control">
    <span class="app-dropdown-control-content">
      <span
        v-if="$slots['control-icon']"
        class="app-dropdown-control-icon"
      >
        <slot name="control-icon" />
      </span>
      <slot />
    </span>
    <AppIcon
      class="app-dropdown-control-right-icon"
      :class="{ 'is-expanded': props.isOpen }"
      :name="IconName.CHEVRON_DOWN"
    />
  </div>
</template>

<script setup lang="ts">
  import AppIcon from '@/components/utils/AppIcon.vue';
  import { IconName } from '@/types/IconName';

  interface Props {
    isOpen: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
  });
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  $border-size: 1px;

  .app-dropdown-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: utils.spacing-unit(2) - $border-size;
    border: $border-size solid utils.$color-mist;
    background-color: utils.$color-mist;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color utils.$transition-duration;
    outline: none;
    @include utils.apply-styles(utils.$text-body-small);

    &:focus-visible {
      border-color: utils.$color-focus
    }

    .app-dropdown-control-content {
      display: flex;
      align-items: center;
    }

    .app-dropdown-control-icon {
      display: inline-flex;
      margin-right: utils.spacing-unit(1);

      ::v-deep(> .app-icon) {
        height: utils.spacing-unit(4);
        width: utils.spacing-unit(4);
      }
    }

    .app-dropdown-control-right-icon {
      margin-left: utils.spacing-unit(1);
      transition: transform utils.$transition-duration;

      &.is-expanded {
        transform: rotate(180deg);
      }

      ::v-deep(> .app-icon) {
        height: utils.spacing-unit(4);
        width: utils.spacing-unit(4);
      }
    }
  }
</style>
