
export const locales = ["fr", "en"] as const;
export const defaultLocale: Locale = "en";

export type Locale = typeof locales[number];