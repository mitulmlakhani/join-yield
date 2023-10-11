<template>
  <svg
    v-if="viewBox"
    class="app-icon"
    aria-hidden="true"
    :viewBox="viewBoxString"
    v-bind="dimensions"
  >
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
  import {
    computed, reactive, toRefs, watch,
  } from 'vue';
  import { IconName } from '@/types/IconName';

  interface Props {
    name: IconName;
  }

  interface AppIconState {
    viewBox: DOMRect | null;
    id: string;
    symbolId: string;
    dimensions: { width: number; height: number; };
    viewBoxString: string;
  }

  const props = defineProps<Props>();
  const state: AppIconState = reactive({
    viewBox: null,
    id: computed(() => `icon-sprite--${props.name}`),
    symbolId: computed(() => `#${state.id}`),
    dimensions: computed(() => {
      if (!state.viewBox) {
        return { width: 0, height: 0 };
      }

      const { width, height } = state.viewBox;

      return { width, height };
    }),
    viewBoxString: computed(() => {
      if (!state.viewBox) {
        return '';
      }

      const { x, y, width, height } = state.viewBox;

      return `${x} ${y} ${width} ${height}`;
    }),
  });

  watch(() => props.name, async () => {
    const svgElement = document.getElementById(state.id) as SVGSymbolElement | null;

    if (!svgElement) {
      return;
    }

    state.viewBox = svgElement.viewBox.baseVal;
  }, { immediate: true });

  const { viewBox, symbolId, dimensions, viewBoxString } = toRefs(state);
</script>
