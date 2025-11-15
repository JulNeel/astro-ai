import { useState, useEffect } from "react";
import { type MenuItem } from "@ts/menuItem.type";
import {
  useTranslations,
  type TranslationKey,
} from "@locales/utils/useTranslations";
import logo_novexis from "@images/logo_novexis.svg";
import connector from "@images/connector.svg";

export default function MainMenuClient({
  items,
  lang = "en",
}: {
  items: MenuItem[];
  lang: string;
}) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [t, setT] = useState<(key: TranslationKey) => string>(
    () => (k: string) => k,
  );

  const target = lang === "en" ? "/fr" : "/en";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq: MediaQueryList = window.matchMedia("(min-width: 768px)");
    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpened(false);
    };
    if (mq.matches) setIsMenuOpened(false);
    mq.addEventListener("change", onMediaChange);
    return () => mq.removeEventListener("change", onMediaChange);
  }, [setIsMenuOpened]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    useTranslations(lang).then((fn) => {
      if (isMounted) setT(() => fn);
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      // Cleanup au démontage du composant
      document.body.style.overflow = "";
    };
  }, [isMenuOpened]);

  return (
    <>
      {/* Menu desktop */}
      <nav
        className={`fixed top-0 right-0 left-0 hidden items-center justify-center pt-2 lg:flex ${isScrolled ? "bg-black/50" : ""} transition-all duration-1000`}
      >
        {items.map((item) => (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            className="group menu-item hover:text-primary mx-4 mt-4 flex flex-col items-center text-2xl transition-colors"
          >
            <span className="mb-2">
              {t(`menu.${item.slug}` as TranslationKey)}
            </span>
            <img
              className="connector transition-visibility invisible mb-4 max-w-12 group-hover:visible"
              src={connector.src}
              alt=""
              aria-hidden
            />
          </a>
        ))}
        <a
          className="hover:bg-primary/80 absolute right-5 inline-flex items-center justify-center rounded-lg border border-white bg-transparent px-4 py-2 text-xl text-white transition-colors hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          rel="alternate"
          href={target}
        >
          {lang === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
        </a>
      </nav>

      {/* Bouton burger */}
      <button
        className="focus:ring-primary fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center rounded-full bg-white p-4 text-white hover:text-white lg:hidden"
        type="button"
        aria-expanded={isMenuOpened}
        aria-label={isMenuOpened ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        <span
          className={`hamburger relative inline-block h-12 w-12 ${isMenuOpened ? "open" : ""}`}
        >
          <img
            className="connector absolute top-1/2 left-1/2 mb-2 block h-[12px] w-12"
            src={connector.src}
            alt=""
            aria-hidden
          />
          <img
            className="connector absolute top-1/2 left-1/2 mb-2 block h-[12px] w-12"
            src={connector.src}
            alt=""
            aria-hidden
          />
          <img
            className="connector absolute top-1/2 left-1/2 mb-2 block h-[12px] w-12"
            src={connector.src}
            alt=""
            aria-hidden
          />
        </span>
      </button>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-40 flex w-full flex-col items-center justify-between bg-black pt-8 pb-32 text-3xl text-white backdrop-blur-lg transition-opacity duration-300 lg:hidden ${
          isMenuOpened
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none hidden opacity-0"
        }`}
        aria-hidden={!isMenuOpened}
      >
        <nav>
          <a
            className="hover:bg-primary/80 mx-auto mb-auto inline-flex items-center justify-center rounded-lg border border-white bg-transparent px-4 py-2 text-xl text-white transition-colors hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            rel="alternate"
            href={target}
          >
            {lang === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
          </a>
        </nav>
        <nav className="mt-auto mb-8 flex flex-col items-start gap-6">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              onClick={() => setIsMenuOpened(false)}
              className="hover:text-primary text-3xl font-semibold transition-colors"
            >
              {item.slug}
            </a>
          ))}
        </nav>
        <img className="max-h-30" src={logo_novexis.src} alt="Logo Novexis" />
      </div>

      <style>{`
        .hamburger .connector {
          transform-origin: center center;
          transition:
            transform 320ms cubic-bezier(0.2, 0.9, 0.2, 1),
            opacity 200ms linear;
        }

        .hamburger .connector:nth-child(1) {
          transform: translate(-50%, -18px);
        }
        .hamburger .connector:nth-child(2) {
          transform: translate(-50%, -50%);
        }
        .hamburger .connector:nth-child(3) {
          transform: translate(-50%, 6px);
        }

        .hamburger.open .connector:nth-child(1) {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        .hamburger.open .connector:nth-child(2) {
          transform: translate(-50%, -50%) scaleX(0);
          opacity: 0;
        }
        .hamburger.open .connector:nth-child(3) {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      `}</style>
    </>
  );
}
