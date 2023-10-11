import type { DirectiveBinding } from 'vue';

const handlerMap = new Map<HTMLElement, EventListener>();

export const outerClick = {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    const onOuterClickFn: unknown = binding.value;

    if (!(onOuterClickFn instanceof Function)) {
      return;
    }

    const handler: EventListener = (event: Event) => {
      if (event.target instanceof Node && !el.contains(event.target)) {
        onOuterClickFn();
      }
    };

    handlerMap.set(el, handler);
    document.addEventListener('click', handler, true);
  },

  unmounted(el: HTMLElement): void {
    const handler = handlerMap.get(el);

    if (handler) {
      document.removeEventListener('click', handler, true);
      handlerMap.delete(el);
    }
  },
};
