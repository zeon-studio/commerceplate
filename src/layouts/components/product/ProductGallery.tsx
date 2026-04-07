"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  JSX,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiZoomIn } from "react-icons/fi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import type { Swiper as TSwiper } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export interface ImageItem {
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

interface CustomZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CustomZoomImage = ({
  src,
  alt,
  width,
  height,
}: CustomZoomImageProps): JSX.Element => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0.5, y: 0.5 });
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [isTouchDevice] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? "ontouchstart" in window || navigator.maxTouchPoints > 0
      : false,
  );
  const [touchStartPosition, setTouchStartPosition] = useState<Position | null>(
    null,
  );
  const [touchMoveCount, setTouchMoveCount] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = (clientX: number, clientY: number): void => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    // Calculate position in percentage (0 to 1)
    const x = Math.max(0, Math.min(1, (clientX - left) / width));
    const y = Math.max(0, Math.min(1, (clientY - top) / height));

    setPosition({ x, y });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (isTouchDevice) return;
    updatePosition(e.clientX, e.clientY);
  };

  // Handle touch events
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);

      // Store touch start position to determine if it was a tap or pan
      setTouchStartPosition({
        x: touch.clientX,
        y: touch.clientY,
      });

      setTouchMoveCount(0);

      // Only show magnifier on first touch if not already zoomed
      if (!isZoomed) {
        setShowMagnifier(true);
      }
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
      setTouchMoveCount((prev) => prev + 1);
    }
  };

  const handleTouchEnd = (_e: TouchEvent<HTMLDivElement>): void => {
    // If almost no movement (less than 5 position updates), consider it a tap
    if (touchMoveCount < 5 && touchStartPosition) {
      handleClick();
    }

    // Reset touch tracking
    setTouchStartPosition(null);

    // Hide magnifier on touch end if not zoomed
    if (!isZoomed) {
      setShowMagnifier(false);
    }
  };

  const handleClick = (): void => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-md ${
        !isZoomed && showMagnifier
          ? "cursor-zoom-in"
          : isZoomed
            ? "cursor-zoom-out"
            : ""
      }`}
      ref={imageRef}
      onMouseEnter={() => !isTouchDevice && setShowMagnifier(true)}
      onMouseLeave={() => !isTouchDevice && setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      onClick={!isTouchDevice ? handleClick : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain"
        draggable={false}
      />

      {/* Magnifying glass icon - shown on hover for desktop, shown on touch for mobile */}
      {showMagnifier && !isZoomed && (
        <div
          className="absolute z-10 flex items-center justify-center bg-white opacity-70 rounded-full p-1 shadow-md"
          style={{
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            width: isTouchDevice ? "40px" : "24px",
            height: isTouchDevice ? "40px" : "24px",
          }}
        >
          <FiZoomIn size={isTouchDevice ? 24 : 16} />
        </div>
      )}

      {/* Zoomed view */}
      {isZoomed && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 cursor-zoom-out"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "200% 200%",
            backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
            zIndex: 10,
          }}
        />
      )}

      {/* Touch zoom instructions - only shown briefly on first touch */}
      {isTouchDevice && isZoomed && (
        <div className="absolute bottom-2 left-0 right-0 text-center bg-black opacity-50 text-white py-1 text-sm z-20">
          Pan to move, tap to exit zoom
        </div>
      )}
    </div>
  );
};

interface ProductGalleryProps {
  images: ImageItem[];
}

// Helper function to get active index from color - defined outside component
const getActiveIndexFromColor = (
  color: string | null,
  uniqueAltTexts: string[],
): number => {
  if (!color) return 0;
  const index = uniqueAltTexts.indexOf(color);
  return index >= 0 ? index : 0;
};

interface ProductGalleryInnerProps extends ProductGalleryProps {
  activeIndex: number;
  uniqueAltTexts: string[];
  colorParam: string | null;
}

const ProductGalleryInner = ({
  images,
  activeIndex,
  uniqueAltTexts,
}: ProductGalleryInnerProps): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);
  const [mainSwiper, setMainSwiper] = useState<TSwiper | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? "ontouchstart" in window || navigator.maxTouchPoints > 0
      : false,
  );

  const filteredImages: ImageItem[] = images.filter(
    (item: ImageItem) => item.altText === uniqueAltTexts[activeIndex],
  );

  const [picUrl, setPicUrl] = useState<string>(filteredImages[0]?.url || "");

  const [prevEl, setPrevEl] = useState<HTMLDivElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLDivElement | null>(null);

  // Reset swiper to first slide when color changes (activeIndex changes)
  useEffect(() => {
    if (mainSwiper) {
      mainSwiper.slideTo(0);
    }
  }, [activeIndex, mainSwiper]);

  const handleSlideChange = (swiper: TSwiper): void => {
    setPicUrl(filteredImages[swiper.activeIndex]?.url || "");
  };

  const handleThumbSlideClick = (clickedUrl: string): void => {
    const foundIndex: number = filteredImages.findIndex(
      (item: ImageItem) => item.url === clickedUrl,
    );
    if (foundIndex !== -1) {
      // Navigate main swiper to the clicked thumb
      if (mainSwiper) {
        mainSwiper.slideTo(foundIndex);
      }
      setPicUrl(filteredImages[foundIndex]?.url || "");
    }
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl,
            nextEl,
          }}
          onSwiper={setMainSwiper}
          onSlideChange={handleSlideChange}
          allowTouchMove={!isHovered} // Disable Swiper touch when zooming is active
        >
          {filteredImages.map((item: ImageItem) => (
            <SwiperSlide key={item.url}>
              <div className="mb-6 border border-border dark:border-border/40 rounded-md max-h-[623px] overflow-hidden">
                <CustomZoomImage
                  src={item.url}
                  alt={item.altText}
                  width={722}
                  height={623}
                />
              </div>
            </SwiperSlide>
          ))}
          <div
            className={`hidden lg:block w-full absolute top-1/2 -translate-y-1/2 z-10 px-6 text-text-dark ${
              isHovered
                ? "opacity-100 transition-opacity duration-300 ease-in-out"
                : "opacity-0 transition-opacity duration-300 ease-in-out"
            }`}
          >
            <div
              ref={setPrevEl}
              className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm absolute left-4"
            >
              <HiOutlineArrowNarrowLeft size={24} />
            </div>
            <div
              ref={setNextEl}
              className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm absolute right-4"
            >
              <HiOutlineArrowNarrowRight size={24} />
            </div>
          </div>
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={isTouchDevice ? 3.5 : 4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {filteredImages.map((item: ImageItem) => (
          <SwiperSlide key={item.url}>
            <div
              onClick={() => handleThumbSlideClick(item.url)}
              className={`rounded-md cursor-pointer overflow-hidden ${
                picUrl === item.url
                  ? "border border-darkmode-border dark:border-yellow-500"
                  : "border border-border dark:border-border/40"
              }`}
            >
              <Image
                src={item.url}
                alt={item.altText}
                width={168}
                height={146}
                className="max-h-[146px]"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const ProductGallery = ({ images }: ProductGalleryProps): JSX.Element => {
  const searchParams = useSearchParams();
  const colorParam = searchParams.get("color");

  const altTextArray: string[] = images.map((item: ImageItem) => item.altText);
  const uniqueAltTexts = [...new Set(altTextArray)];
  const activeIndex = getActiveIndexFromColor(colorParam, uniqueAltTexts);

  // Use key to force remount when color changes
  return (
    <ProductGalleryInner
      key={colorParam || "default"}
      images={images}
      activeIndex={activeIndex}
      uniqueAltTexts={uniqueAltTexts}
      colorParam={colorParam}
    />
  );
};

export default ProductGallery;
