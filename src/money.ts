export type Line = { amount: number };

/**
 * Minor-unit exponents for the ISO 4217 currencies whose exponent is not the
 * default of 2. ISO 4217 "Currency codes" assigns an exponent (the number of
 * digits after the decimal separator) to every listed currency; all codes not
 * present here have exponent 2.
 */
const ISO_4217_MINOR_UNIT_EXCEPTIONS: Record<string, number> = {
  // Exponent 0
  BIF: 0, // Burundian franc
  CLP: 0, // Chilean peso
  DJF: 0, // Djiboutian franc
  GNF: 0, // Guinean franc
  ISK: 0, // Icelandic króna
  JPY: 0, // Japanese yen
  KMF: 0, // Comorian franc
  KRW: 0, // South Korean won
  PYG: 0, // Paraguayan guaraní
  RWF: 0, // Rwandan franc
  UGX: 0, // Ugandan shilling
  UYI: 0, // Uruguay M2 index ( peso en unidades indexadas )
  VND: 0, // Vietnamese đồng
  VUV: 0, // Vanuatu vatu
  // Exponent 3
  BHD: 3, // Bahraini dinar
  IQD: 3, // Iraqi dinar
  JOD: 3, // Jordanian dinar
  KWD: 3, // Kuwaiti dinar
  LYD: 3, // Libyan dinar
  OMR: 3, // Omani rial
  TND: 3, // Tunisian dinar
  // Exponent 4
  CLF: 4, // Chilean unidad de fomento
  UYW: 4, // Uruguayan unidad previsional
};

/**
 * Returns the ISO 4217 minor-unit exponent (number of decimal places) of a
 * currency code. Codes with the default exponent of 2 and codes not listed in
 * ISO 4217 both resolve to 2.
 */
export function minorUnitDigits(currency: string): number {
  return ISO_4217_MINOR_UNIT_EXCEPTIONS[currency.trim().toUpperCase()] ?? 2;
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = minorUnitDigits(currency);
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  return sum.toFixed(digits);
}
