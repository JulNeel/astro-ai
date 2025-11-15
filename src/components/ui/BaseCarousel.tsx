import { useState, useRef, useEffect, type ReactNode } from "react";
import arrow_down from "@images/arrow_down_black.svg";
import {
  useTranslations,
  type TranslationKey,
} from "@locales/utils/useTranslations";

interface CarouselProps {
  lang: string;
  children: ReactNode;
  itemWidth?: number;
  gap?: number;
  className?: string;
}

export default function Carousel({
  lang = "en",
  children,
  itemWidth = 300,
  gap = 16,
  className = "",
}: CarouselProps) {
  const [t, setT] = useState<(key: TranslationKey) => string>(
    () => (k: string) => k,
  );
  const [currentPosition, setCurrentPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [shouldCenter, setShouldCenter] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollAmount = itemWidth + gap;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

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
    const updateMaxScroll = () => {
      if (trackRef.current && wrapperRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const newMaxScroll = trackWidth - wrapperWidth;
        setMaxScroll(Math.max(0, newMaxScroll));

        setShouldCenter(trackWidth <= wrapperWidth);
      }
    };
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, [children]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const diff = startX - e.clientX;
      setDragOffset(diff);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);

      const threshold = 50;
      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          setCurrentPosition((prev) =>
            Math.min(maxScroll, prev + scrollAmount),
          );
        } else {
          setCurrentPosition((prev) => Math.max(0, prev - scrollAmount));
        }
      }
      setDragOffset(0);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, dragOffset, maxScroll, scrollAmount]);

  const handlePrev = () => {
    setCurrentPosition((prev) => Math.max(0, prev - scrollAmount));
  };

  const handleNext = () => {
    setCurrentPosition((prev) => Math.min(maxScroll, prev + scrollAmount));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (shouldCenter) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || shouldCenter) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || shouldCenter) return;
    setIsDragging(false);

    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrentPosition((prev) => Math.min(maxScroll, prev + scrollAmount));
      } else {
        setCurrentPosition((prev) => Math.max(0, prev - scrollAmount));
      }
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (shouldCenter) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const canGoPrev = currentPosition > 0 && !shouldCenter;
  const canGoNext = currentPosition < maxScroll && !shouldCenter;

  const finalPosition = currentPosition + dragOffset;
  const clampedPosition = Math.max(0, Math.min(maxScroll, finalPosition));

  return (
    <div className={`relative flex w-full items-center gap-4 ${className}`}>
      <button
        onClick={handlePrev}
        className={`${canGoPrev ? "lg:flex" : "lg:hidden"} hover:bg-tertiary/70 absolute z-10 hidden h-20 w-20 items-center justify-center rounded-full bg-white/80 p-5 transition-all`}
        aria-label={t("about-section.button.previous")}
      >
        <img src={arrow_down.src} className="h-full w-full rotate-90" alt="" />
      </button>

      <div
        ref={wrapperRef}
        className="flex-1 overflow-hidden select-none"
        style={{
          cursor: shouldCenter ? "default" : isDragging ? "grabbing" : "grab",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div
          ref={trackRef}
          className="pointer-events-none flex ease-in-out"
          style={{
            transform: shouldCenter
              ? "none"
              : `translateX(-${clampedPosition}px)`,
            gap: `${gap}px`,
            transition: isDragging ? "none" : "transform 300ms",
            justifyContent: shouldCenter ? "center" : "flex-start",
          }}
        >
          {children}
        </div>
      </div>

      <button
        onClick={handleNext}
        className={`${canGoNext ? "lg:flex" : "lg:hidden"} hover:bg-tertiary/70 absolute right-0 z-10 hidden h-20 w-20 items-center justify-center rounded-full bg-white/80 p-5 transition-all`}
        aria-label="Next"
      >
        <img src={arrow_down.src} className="h-8 w-8 rotate-270" alt="" />
      </button>
    </div>
  );
}

interface CarouselItemProps {
  children: ReactNode;
  width?: number;
  className?: string;
}

export function CarouselItem({
  children,
  width = 300,
  className = "",
}: CarouselItemProps) {
  return (
    <div
      className={`flex-shrink-0 ${className}`}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
    >
      {children}
    </div>
  );
}
