export abstract class GeneralHelper {
  static convertToShortValue(value: string, threshold = 9) {
    if (value.length === 0) {
      return "no value";
    }

    if (value.length <= threshold) {
      return value;
    }

    return `${value.slice(0, Math.ceil(threshold / 2))}...${value.slice(
      -Math.round(threshold / 2)
    )}`;
  }

  static async copyText(
    text: string,
    onSuccess: () => unknown,
    onFail: () => unknown
  ) {
    try {
      await window.navigator.clipboard.writeText(text);
      onSuccess();
    } catch (e) {
      onFail();
    }
  }

  static formatToCurrency(num: number, precision = 2) {
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted =
        (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }

    return num;
  }

  static formatNumber = (num: number | string, places: number = 6): number => {
    const multiplier = Math.pow(10, places);

    return Math.floor(Number(num) * multiplier) / multiplier;
  };
}
