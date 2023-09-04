export function kFormat(n: number) {
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(n);
}
