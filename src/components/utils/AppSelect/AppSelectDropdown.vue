<template>
  <div
    ref="dropdown"
    class="app-select-dropdown"
    @mouseleave="setPointerIndex(-1)"
    @mousedown.prevent
  >
    <ul
      v-if="props.options.length"
      ref="list"
      :style="listStyles"
      class="app-select-dropdown-list"
    >
      <AppSelectDropdownOption
        v-for="(option, index) in props.options"
        :key="props.trackBy(option)"
        :style="`height: ${props.optionHeight}px`"
        :value="value || ''"
        :option="option"
        :track-by="props.trackBy"
        :id-prefix="props.idPrefix"
        :is-active="index === pointerIndex"
        @select="selectOption"
        @focusin="setPointerIndex(index)"
        @mouseenter="setPointerIndex(index)"
      >
        <slot
          :option="option"
          name="option"
        />

        <template
          v-if="$slots['option-icon']"
          #option-icon
        >
          <slot
            :option="option"
            name="option-icon"
          />
        </template>

        <template #option-text>
          <slot
            :option="option"
            name="option-text"
          />
        </template>
      </AppSelectDropdownOption>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import AppSelectDropdownOption from '@/components/utils/AppSelect/AppSelectDropdownOption.vue';
  import { computed, onMounted, reactive, ref, toRefs } from 'vue';
  import type { AppSelectValue } from '@/components/utils/AppSelect/app-select';
  import { OPTION_HEIGHT, OPTIONS_LIMIT } from '@/components/utils/AppSelect/app-select';

  interface Props {
    idPrefix: string;
    value: AppSelectValue | null;
    options: AppSelectValue[];
    trackBy?: (option: AppSelectValue | null) => string;
    optionHeight?: number;
  }

  interface Emits {
    (event: 'select', option: AppSelectValue): void;
  }

  interface AppSelectDropdownState {
    pointerIndex: number;
    lastItemIndex: number;
    pointerPosition: number;
    selectedOptionIndex: number;
    listStyles: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    value: null,
    options: () => [],
    trackBy: (option: AppSelectValue | null) => String(option),
    optionHeight: OPTION_HEIGHT,
  });

  const state: AppSelectDropdownState = reactive({
    pointerIndex: -1,
    lastItemIndex: computed(() => props.options.length - 1),
    pointerPosition: computed(() => state.pointerIndex * props.optionHeight),
    selectedOptionIndex: computed(() => {
      if (!props.value) {
        return -1;
      }

      return props.options.findIndex((option) => (option
        ? props.trackBy(option) === props.trackBy(props.value)
        : false));
    }),
    listStyles: computed(() => {
      const maxHeight = props.optionHeight * OPTIONS_LIMIT;

      return `max-height: ${maxHeight}px`;
    }),
  });

  const emit = defineEmits<Emits>();

  const setPointerIndex = (index: number) => {
    state.pointerIndex = index;
  };

  const selectOption = (option: AppSelectValue) => {
    emit('select', option);
  };

  const movePointerDown = () => {
    if (state.pointerIndex >= state.lastItemIndex) {
      return;
    }

    setPointerIndex(state.pointerIndex + 1);
    adjustVisibleArea();
  };

  const movePointerUp = () => {
    if (state.pointerIndex <= 0) {
      return;
    }

    setPointerIndex(state.pointerIndex - 1);
    adjustVisibleArea();
  };

  const handleEnterSelection = () => {
    if (props.options.length === 0) {
      return;
    }

    selectOption(props.options[state.pointerIndex]);
  };

  defineExpose({
    movePointerDown,
    movePointerUp,
    handleEnterSelection,
  });

  const list = ref<HTMLDivElement>();

  const adjustVisibleArea = () => {
    if (!list.value) {
      return;
    }

    const areaStart = list.value.scrollTop;
    const areaEnd = list.value.scrollTop + list.value.offsetHeight;
    const isOptionAboveVisibleArea = state.pointerPosition <= areaStart;
    const isOptionBelowVisibleArea = state.pointerPosition >= areaEnd;

    if (isOptionAboveVisibleArea) {
      scrollToPointer(-props.optionHeight);

      return;
    }

    if (isOptionBelowVisibleArea) {
      scrollToPointer(0);
    }
  };

  const scrollToPointer = (offset: number) => {
    if (!list.value) {
      return;
    }

    list.value.scrollTop = state.pointerPosition + offset;
  };

  onMounted(() => {
    if (props.options.length) {
      scrollMenuToSelectedElement();
    }
  });

  const scrollMenuToSelectedElement = () => {
    const pointerIndex = state.selectedOptionIndex === -1
      ? -1
      : state.selectedOptionIndex;

    setPointerIndex(pointerIndex);
    scrollToPointer(0);
  };

  const { pointerIndex, listStyles } = toRefs(state);
</script>

<style lang="scss" scoped>
  @use '../../../styles/utils/_index.scss' as utils;

  .app-select-dropdown {
    position: absolute;
    top: calc(100% + 5px);
    width: 100%;
    overflow: hidden;
    display: flex;
    border-radius: 8px;
    @include utils.apply-styles(utils.$text-body-small);
    z-index: 1;

    .app-select-dropdown-list {
      width: 100%;
    }
  }
</style>
