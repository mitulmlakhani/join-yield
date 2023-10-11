<template>
  <li
    class="app-select-dropdown-option"
    :class="{ 'is-selected': isSelected, 'is-active': isActive }"
    @click="selectOption"
    @mouseenter="emitMouseenter"
    @focusin="emitFocusin"
  >
    <slot>
      <span
        v-if="$slots['option-icon']"
        class="app-select-dropdown-option-icon"
      >
        <slot name="option-icon" />
      </span>

      <span class="app-select-dropdown-option-text">
        <slot name="option-text" />
      </span>
    </slot>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { AppSelectValue } from '@/components/utils/AppSelect/app-select';

  interface Props {
    idPrefix: string;
    value: AppSelectValue;
    option: AppSelectValue;
    trackBy?: (options: AppSelectValue) => string;
    isActive?: boolean;
  }

  interface Emits {
    (event: 'select', value: AppSelectValue): void;
    (event: 'mouseenter'): void;
    (event: 'focusin'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    trackBy: (option: AppSelectValue) => String(option),
    isActive: false,
  });

  const emit = defineEmits<Emits>();

  const isSelected = computed(() => {
    if (!props.value) {
      return false;
    }

    return props.trackBy(props.value) === props.trackBy(props.option);
  });

  const selectOption = () => {
    emit('select', props.option);
  };

  const emitMouseenter = () => {
    emit('mouseenter');
  };

  const emitFocusin = () => {
    emit('focusin');
  };
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app-select-dropdown-option {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    background-color: utils.$color-mist;
    padding: utils.spacing-unit(2);
    position: relative;
    transition: background-color utils.$transition-duration;

    &.is-active,
    &:hover {
      background-color: utils.$color-gray-light;
    }

    &.is-selected,
    &:active {
      background-color: utils.$color-gray-light;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background-color: utils.$color-primary;
      }
    }

    .app-select-dropdown-option-icon {
      width: 16px;
      height: 16px;
      margin-right: utils.spacing-unit(2);
      flex-shrink: 0;

      ::v-deep(.app-icon) {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
