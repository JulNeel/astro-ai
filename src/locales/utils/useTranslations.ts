import { defaultLocale } from "@locales/i18n.config";


function getNestedValue(obj: Record<string, any>, path: string): string | undefined {
  const result = path.split(".").reduce<any>((acc, part) => acc?.[part], obj);
  return typeof result === "string" ? result : undefined;
}

type DotPaths<T, P extends string = ""> = {
  [K in keyof T & string]:
  T[K] extends Record<string, any>
  ? DotPaths<T[K], `${P}${K}.`>
  : `${P}${K}`;
}[keyof T & string];

type TranslationObject = typeof import("@locales/en.json");
export type TranslationKey = DotPaths<TranslationObject>;


export async function useTranslations(lang: string = defaultLocale) {
  const current = await import(`../${lang}.json`).then(m => m.default);
  const fallback = await import(`../en.json`).then(m => m.default);

  return function t(key: TranslationKey): string {
    const value = getNestedValue(current, key);
    return value ?? getNestedValue(fallback, key) ?? key;
  };
}
