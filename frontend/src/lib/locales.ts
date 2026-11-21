export const localeCodes = ["es", "en", "fr", "it", "pt"] as const;

export type LocaleCode = (typeof localeCodes)[number];

export const localeOptions: { code: LocaleCode; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
];

export function isLocale(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}
