"use client";

import config from "@/config/config.json";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./rangeSlider.css";

const RangeSlider = ({
  maxPriceData,
}: {
  maxPriceData: { amount: string; currencyCode: string };
}) => {
  const { currencyCode, currencySymbol } = config.shopify;
  const maxAmount = parseInt(maxPriceData?.amount);

  const router = useRouter();
  const searchParams = useSearchParams();
  const getMinPrice = searchParams.get("minPrice");
  const getMaxPrice = searchParams.get("maxPrice");

  const [minValue, setMinValue] = useState(() =>
    getMinPrice ? parseInt(getMinPrice) : 0,
  );
  const [maxValue, setMaxValue] = useState(() =>
    getMaxPrice ? parseInt(getMaxPrice) : maxAmount,
  );

  const rangeRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const rangeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !rangeLineRef.current ||
      !minThumbRef.current ||
      !maxThumbRef.current ||
      !rangeRef.current
    ) {
      return;
    }

    const minPercent = (minValue / maxAmount) * 100;
    const maxPercent = (maxValue / maxAmount) * 100;

    rangeLineRef.current.style.left = `${minPercent}%`;
    rangeLineRef.current.style.width = `${maxPercent - minPercent}%`;
    minThumbRef.current.style.left = `${minPercent}%`;
    maxThumbRef.current.style.left = `${maxPercent}%`;
  }, [minValue, maxValue, maxAmount]);

  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const rangeRect = rangeRef.current?.getBoundingClientRect();
    if (!rangeRect) return;

    const rangeWidth = rangeRect.width;
    const initialMinVal = minValue;
    const initialMaxVal = maxValue;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dPercent = (dx / rangeWidth) * 100;

      if (thumb === "min") {
        const newPercent = (initialMinVal / maxAmount) * 100 + dPercent;
        const newValue = Math.max(
          0,
          Math.min(maxValue - 1, Math.round((newPercent * maxAmount) / 100)),
        );
        setMinValue(newValue);
      } else {
        const newPercent = (initialMaxVal / maxAmount) * 100 + dPercent;
        const newValue = Math.max(
          minValue + 1,
          Math.min(maxAmount, Math.round((newPercent * maxAmount) / 100)),
        );
        setMaxValue(newValue);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  function priceChange(minValue: number, maxValue: number) {
    const newParams = new URLSearchParams(searchParams.toString());

    // Update or add "minPrice" and "maxPrice" parameters
    newParams.set("minPrice", minValue.toString());
    newParams.set("maxPrice", maxValue.toString());

    router.push(createUrl("/products", newParams), { scroll: false });
  }

  const showSubmitButton =
    (minValue !== (getMinPrice ? parseInt(getMinPrice) : 0) ||
      maxValue !== (getMaxPrice ? parseInt(getMaxPrice) : maxAmount)) &&
    (minValue !== 0 || maxValue !== maxAmount);

  return (
    <div className="range-slider-container">
      <div className="flex justify-between">
        <p>
          {currencySymbol}
          {minValue} {maxPriceData?.currencyCode || currencyCode}
        </p>
        <p>
          {currencySymbol}
          {maxValue} {maxPriceData?.currencyCode || currencyCode}
        </p>
      </div>

      <div className="range-slider" ref={rangeRef}>
        <div className="slider-track"></div>
        <div className="slider-range" ref={rangeLineRef}></div>
        <div
          className="slider-thumb thumb-min"
          ref={minThumbRef}
          onMouseDown={handleMouseDown("min")}
        ></div>
        <div
          className="slider-thumb thumb-max"
          ref={maxThumbRef}
          onMouseDown={handleMouseDown("max")}
        ></div>
      </div>

      {showSubmitButton && (
        <button
          className="btn btn-sm btn-primary w-full mb-4"
          onClick={() => {
            priceChange(minValue, maxValue);
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default RangeSlider;
