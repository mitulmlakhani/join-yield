const MOBILE_VIEWPORT_BREAKPOINT = 640;
const TABLET_VIEWPORT_BREAKPOINT = 1280;
const tabletQuery = `(max-width: ${TABLET_VIEWPORT_BREAKPOINT}px)`;
const mobileQuery = `(max-width: ${MOBILE_VIEWPORT_BREAKPOINT}px)`;

export default class ViewportHelper {
  static isTouch(): boolean {
    return window.matchMedia(tabletQuery).matches;
  }

  static isMobile(): boolean {
    return window.matchMedia(mobileQuery).matches;
  }

  static matchMobile(onIsMobileChange: () => void): void {
    window.matchMedia(mobileQuery).onchange = onIsMobileChange;
  }

  static matchTouch(onIsMobileChange: (event: MediaQueryListEvent) => void): void {
    window.matchMedia(tabletQuery).onchange = onIsMobileChange;
  }
}
