<template>
  <div
    class="app-alert"
    :class="classes"
  >
    <AppIcon
      class="app-alert-icon"
      :name="IconName.EXCLAMATION_MARK"
    />
    <slot />
    <button
      v-if="$slots['button-text']"
      class="button is-primary-accent is-small app-alert-button"
      type="button"
      @click="emitAction"
    >
      <slot name="button-text" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { AlertType } from '@/types/AlertType';
  import { computed } from 'vue';
  import AppIcon from '@/components/utils/AppIcon.vue';
  import { IconName } from '@/types/IconName';

  interface Props {
    type: AlertType;
  }

  interface Emits {
    (event: 'action'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: AlertType.INFO,
  });

  const emit = defineEmits<Emits>();

  const classes = computed(() => ({
    'is-info': props.type === AlertType.INFO,
    'is-danger': props.type === AlertType.DANGER,
  }));

  const emitAction = () => {
    emit('action');
  };
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app-alert {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: utils.spacing-unit(3) utils.spacing-unit(3) utils.spacing-unit(3) utils.spacing-unit(9);
    border-radius: 8px;

    &.is-danger {
      color: utils.$color-primary;
      background-color: utils.$color-pink;

      .app-alert-icon {
        fill: utils.$color-primary;
      }
    }

    &.is-info {
      color: utils.$color-navi;
      background-color: utils.$color-blue;

      .app-alert-icon {
        fill: utils.$color-navi;
      }
    }

    .app-alert-icon {
      @include utils.absolute-y-center;
      left: utils.spacing-unit(3);
      width: 16px;
      height: 16px;
    }

    .app-alert-button {
      margin-left: utils.spacing-unit(2);
    }
  }
</style>
