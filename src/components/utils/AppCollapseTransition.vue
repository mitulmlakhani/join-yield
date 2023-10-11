<template>
  <transition
    class="app-collapse-transition"
    :name="name"
    @before-appear="emit('before-appear', $event)"
    @appear="emit('appear', $event)"
    @after-appear="emit('after-appear', $event)"
    @appear-cancelled="emit('appear-cancelled', $event)"
    @before-enter="emit('before-enter', $event)"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="emit('enter-cancelled', $event)"
    @before-leave="emit('before-leave', $event)"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="emit('leave-cancelled', $event)"
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
// https://github.com/ivanvermeyen/vue-collapse-transition

  import { computed, ref, VueElement, watch } from 'vue';

  interface Props {
    name?: string;
    dimension?: 'height' | 'width';
    duration?: number;
    easing?: string;
  }

  interface Emits {
    (event: 'before-appear', el: VueElement): void;
    (event: 'appear', el: VueElement): void;
    (event: 'after-appear', el: VueElement): void;
    (event: 'appear-cancelled', el: VueElement): void;
    (event: 'before-enter', el: VueElement): void;
    (event: 'enter', el: VueElement, done: () => void): void;
    (event: 'after-enter', el: VueElement): void;
    (event: 'enter-cancelled', el: VueElement): void;
    (event: 'before-leave', el: VueElement): void;
    (event: 'leave', el: VueElement, done: () => void): void;
    (event: 'after-leave', el: VueElement): void;
    (event: 'leave-cancelled', el: VueElement): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    name: 'collapse',
    dimension: 'height',
    duration: 200,
    easing: 'ease-in-out',
  });

  const cachedStyles = ref<string[] | null>(null);
  const clearCachedDimensions = () => {
    cachedStyles.value = null;
  };

  watch(() => props.dimension, clearCachedDimensions);

  const transition = computed(():string => {
    const transitions: string[] = [];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(cachedStyles.value).forEach((key) => {
      transitions.push(`${convertToCssProperty(key)} ${props.duration}ms ${props.easing}`);
    });

    return transitions.join(', ');
  });

  const convertToCssProperty = (style: string): string => {
    // Example: convert 'paddingTop' to 'padding-top'
    // Thanks: https://gist.github.com/tan-yuki/3450323
    const upperChars = style.match(/([A-Z])/g);

    if (!upperChars) {
      return style;
    }

    for (let i = 0, n = upperChars.length; i < n; i += 1) {
      // eslint-disable-next-line no-param-reassign
      style = style.replace(new RegExp(upperChars[i]), `-${upperChars[i].toLowerCase()}`);
    }

    if (style.slice(0, 1) === '-') {
      // eslint-disable-next-line no-param-reassign
      style = style.slice(1);
    }

    return style;
  };

  const emit = defineEmits<Emits>();

  const enter = (el: VueElement, done: () => void) => {
    // Because width and height may be 'auto',
    // first detect and cache the dimensions
    detectAndCacheDimensions(el);
    // The order of applying styles is important:
    // - 1. Set styles for state before transition
    // - 2. Force repaint
    // - 3. Add transition style
    // - 4. Set styles for state after transition
    // If the order is not right and you open any 2nd level submenu
    // for the first time, the transition will not work.
    setClosedDimensions(el);
    hideOverflow(el);
    forceRepaint(el);
    setTransition(el);
    setOpenedDimensions(el);
    // Emit the event to the parent
    emit('enter', el, done);
    // Call done() when the transition ends
    // to trigger the @after-enter event.
    setTimeout(done, props.duration);
  };

  const detectAndCacheDimensions = (el: VueElement) => {
    // Cache actual dimensions
    // only once to void invalid values when
    // triggering during a transition
    if (cachedStyles.value) {
      return;
    }

    const { visibility } = el.style;
    const { display } = el.style;

    // Trick to get the width and
    // height of a hidden element
    // eslint-disable-next-line no-param-reassign
    el.style.visibility = 'hidden';
    // eslint-disable-next-line no-param-reassign
    el.style.display = '';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cachedStyles.value = detectRelevantDimensions(el);
    // Restore any original styling
    // eslint-disable-next-line no-param-reassign
    el.style.visibility = visibility;
    // eslint-disable-next-line no-param-reassign
    el.style.display = display;
  };

  const afterEnter = (el: VueElement) => {
    // Clean up inline styles
    unsetOverflow(el);
    unsetTransition(el);
    unsetDimensions(el);
    clearCachedDimensions();
    // Emit the event to the parent
    emit('after-enter', el);
  };

  const leave = (el: VueElement, done: () => void) => {
    // For some reason, @leave triggered when starting
    // from open state on page load. So for safety,
    // check if the dimensions have been cached.
    detectAndCacheDimensions(el);
    // The order of applying styles is less important
    // than in the enter phase, as long as we repaint
    // before setting the closed dimensions.
    // But it is probably best to use the same
    // order as the enter phase.
    setOpenedDimensions(el);
    hideOverflow(el);
    forceRepaint(el);
    setTransition(el);
    setClosedDimensions(el);
    // Emit the event to the parent
    emit('leave', el, done);
    // Call done() when the transition ends
    // to trigger the @after-leave event.
    // This will also cause v-show
    // to reapply 'display: none'.
    window.setTimeout(done, props.duration);
  };

  const afterLeave = (el: VueElement) => {
    // Clean up inline styles
    unsetOverflow(el);
    unsetTransition(el);
    unsetDimensions(el);
    clearCachedDimensions();
    // Emit the event to the parent
    emit('after-leave', el);
  };

  const detectRelevantDimensions = (el: VueElement) => {
    // These properties will be transitioned
    if (props.dimension === 'height') {
      return {
        height: `${el.offsetHeight}px`,
        paddingTop: el.style.paddingTop || getCssValue(el, 'padding-top'),
        paddingBottom: el.style.paddingBottom || getCssValue(el, 'padding-bottom'),
      };
    }

    if (props.dimension === 'width') {
      return {
        width: `${el.offsetWidth}px`,
        paddingLeft: el.style.paddingLeft || getCssValue(el, 'padding-left'),
        paddingRight: el.style.paddingRight || getCssValue(el, 'padding-right'),
      };
    }

    return {};
  };

  const setTransition = (el: VueElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.transition = transition.value;
  };

  const unsetTransition = (el: VueElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.transition = '';
  };

  const hideOverflow = (el: VueElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.overflow = 'hidden';
  };

  const unsetOverflow = (el: VueElement) => {
    // eslint-disable-next-line no-param-reassign
    el.style.overflow = '';
  };

  const setClosedDimensions = (el: VueElement) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(cachedStyles.value).forEach((key: unknown) => {
      // eslint-disable-next-line no-param-reassign
      el.style[key as number] = '0';
    });
  };

  const setOpenedDimensions = (el: VueElement) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(cachedStyles.value).forEach((key: unknown) => {
      if (cachedStyles.value) {
        // eslint-disable-next-line no-param-reassign
        el.style[key as number] = cachedStyles.value[key as number];
      }
    });
  };

  const unsetDimensions = (el: VueElement) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.keys(cachedStyles.value).forEach((key: unknown) => {
      // eslint-disable-next-line no-param-reassign
      el.style[key as number] = '';
    });
  };

  const forceRepaint = (el: VueElement) => {
    // Force repaint to make sure the animation is triggered correctly.
    // Thanks: https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
    // eslint-disable-next-line no-unused-expressions
    getComputedStyle(el)[props.dimension];
  };

  const getCssValue = (el: VueElement, style: string) => getComputedStyle(el, null).getPropertyValue(style);

</script>
