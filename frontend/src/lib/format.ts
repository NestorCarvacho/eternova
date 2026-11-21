export function formatClp(value: number, _locale: string) {
  const amount = new Intl.NumberFormat("es-CL", {
    maximumFractionDigits: 0,
  }).format(value);
  return `$${amount} CLP`;
}
