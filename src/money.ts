export type Line = { amount: number };

// The number of decimal places a total may show is defined per currency by
// ISO 4217 (the currency's "minor unit" exponent): 2 for USD/EUR, 0 for
// JPY/KRW, 3 for KWD/BHD/OMR/TND/JOD/IQD/LYD, 4 for CLF/UYW, etc.
// Rather than hardcoding a table, read the exponent from the runtime's
// Intl currency data, which implements ISO 4217 for every currency.
function currencyFractionDigits(currency: string): number {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  const options = formatter.resolvedOptions();
  return options.maximumFractionDigits;
}

export function formatTotal(lines: Line[], currency: string): string {
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  const digits = currencyFractionDigits(currency);
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  }).format(sum);
}
