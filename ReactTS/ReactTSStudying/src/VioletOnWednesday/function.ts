export function formatVND(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(roundNumber(price));
}

export const roundNumber = (
  value: number,
  decimalPlaces: number = 0
): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
};
