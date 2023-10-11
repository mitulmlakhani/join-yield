<template>
  <button
    class="app-copy-text-button button is-ghost is-icon is-small"
    type="button"
    @click.stop="copyToClipboard"
  >
    <AppIcon :name="IconName.COPY" />

    <transition name="opacity-transition">
      <span
        v-if="isSuccessShown"
        class="app-copy-text-button-toast"
      >
        Copied
      </span>
    </transition>
  </button>
</template>

<script setup lang="ts">
  import AppIcon from '@/components/utils/AppIcon.vue';
  import { IconName } from '@/types/IconName';
  import { GeneralHelper } from '@/helpers/GeneralHelper';
  import { reactive, toRefs } from 'vue';

  interface Props {
    text: string;
  }

  interface State {
    isSuccessShown: boolean;
  }

  const TOAST_CLOSE_TIME_MS = 5000;

  const props = defineProps<Props>();

  const state: State = reactive({
    isSuccessShown: false,
  });

  const copyToClipboard = () => {
    GeneralHelper.copyText(
      props.text,
      () => {
        state.isSuccessShown = true;
        window.setTimeout(() => {
          state.isSuccessShown = false;
        }, TOAST_CLOSE_TIME_MS);
      },
      () => console.log('copy error'),
    );
  };

  const { isSuccessShown } = toRefs(state);
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app-copy-text-button {
    position: relative;

    .app-copy-text-button-toast {
      position: absolute;
      background: rgba(30, 54, 117, 0.4);
      border-radius: 4px;
      padding: utils.spacing-unit(1) utils.spacing-unit(2);
      color: utils.$color-white;
      top: calc(-100% - #{utils.spacing-unit(1)});
      @include utils.apply-styles(utils.$text-body-medium-small);
    }
  }
</style>
