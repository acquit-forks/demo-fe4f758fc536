export type Line = { amount: number };

// Number of decimal places of the currency's minor unit, per ISO 4217
// (0 for JPY, 3 for KWD, 2 for USD, etc.). CLDR/Intl implements ISO 4217,
// so ask it instead of hardcoding a table or defaulting to 2.
const minorUnitDigitsCache = new Map<string, number>();
function minorUnitDigits(currency: string): number {
  let digits = minorUnitDigitsCache.get(currency);
  if (digits === undefined) {
    const parts = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).formatToParts(1);
    const fraction = parts.find((part) => part.type === 'fraction')?.value ?? '';
    digits = fraction.length;
    minorUnitDigitsCache.set(currency, digits);
  }
  return digits;
}

// Round to `digits` decimal places, half away from zero (accounting rounding),
// using exponent-notation strings to avoid binary floating-point drift such as
// 1.005 * 100 === 100.49999999999999.
function roundTo(value: number, digits: number): number {
  const magnitude = Math.round(`${Math.abs(value)}e${digits}`);
  return Number(`${magnitude}e-${digits}`) * Math.sign(value);
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = minorUnitDigits(currency);
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  return roundTo(sum, digits).toFixed(digits);
}
