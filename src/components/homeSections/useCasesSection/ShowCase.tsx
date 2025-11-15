import { useEffect, useState } from "react";
import {
  useTranslations,
  type TranslationKey,
} from "@locales/utils/useTranslations";
import { type ShowcaseItem } from "@ts/showcaseItem.type";
import { defaultLocale } from "@locales/i18n.config";

type Props = {
  lang?: string;
  items: ShowcaseItem[];
  children?: React.ReactNode;
  extraClass?: string;
};

export default function ShowCase({
  children,
  lang = defaultLocale,
  items,
  extraClass,
}: Props) {
  const [t, setT] = useState<(key: TranslationKey) => string>(
    () => (k: string) => k,
  );
  const [selectedItemId, setSelectedItemId] = useState(items[0].id);

  useEffect(() => {
    let isMounted = true;
    useTranslations(lang).then((fn) => {
      if (isMounted) setT(() => fn);
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <div className={`flex flex-col gap-4 text-white lg:flex-row ${extraClass}`}>
      <div className="flex lg:hidden">{children}</div>
      <div className="flex flex-1 items-center justify-center">
        {selectedItem && (
          <img
            src={selectedItem.imageSource}
            alt=""
            className="max-h-full max-w-full object-contain transition-opacity duration-300"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex-1 flex-col gap-4">
        <div className="hidden lg:block">{children}</div>

        <div className="grid flex-1 auto-rows-fr grid-cols-2 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
              className={`flex cursor-pointer flex-col items-start gap-3 rounded-lg border border-white p-4 text-left transition-all duration-100 ${
                selectedItemId === item.id
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
              } `}
            >
              <div className="text-primary1 h-8 w-8 flex-shrink-0">
                <img
                  src={item.iconSource}
                  alt=""
                  className={`text-primary h-full w-full transition-all duration-200`}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-base font-semibold">
                  {t(
                    `use-cases-section.showcase.button.${item.labelTranslationKey}` as TranslationKey,
                  )}
                </h3>
                <p className="text-sm opacity-80">
                  {t(
                    `use-cases-section.showcase.button.${item.descriptionTranslationKey}` as TranslationKey,
                  )}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
