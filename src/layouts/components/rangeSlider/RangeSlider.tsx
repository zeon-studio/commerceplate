"use client";

import { createUrl } from "@/lib/utils";
import MultiRangeSlider from "multi-range-slider-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import "./rangeSlider.css";
import config from "@/config/config.json";

const RangeSlider = ({
  maxPriceData,
}: {
  maxPriceData: { amount: string; currencyCode: string };
}) => {
  const { currencyCode, currencySymbol } = config.shopify;

  // const [minValue, setMinValue] = useState(0);
  // const [maxValue, setMaxValue] = useState(0);
  const [minValue2, setMinValue2] = useState(0);
  const [maxValue2, setMaxValue2] = useState(parseInt(maxPriceData?.amount));

  const router = useRouter();
  const searchParams = useSearchParams();
  const getMinPrice = searchParams.get("minPrice");
  const getMaxPrice = searchParams.get("maxPrice");

  function priceChange(minValue: number, maxValue: number) {
    const newParams = new URLSearchParams(searchParams.toString());

    // Update or add "minPrice" and "maxPrice" parameters
    newParams.set("minPrice", minValue.toString());
    newParams.set("maxPrice", maxValue.toString());

    router.push(createUrl("/products", newParams), { scroll: false });
  }

  return (
    <div>
      <div className="flex justify-between">
        <p>
          {currencySymbol}
          {minValue2} {maxPriceData?.currencyCode || currencyCode}
        </p>
        <p>
          {currencySymbol}
          {maxValue2} {maxPriceData?.currencyCode || currencyCode}
        </p>
      </div>

      <MultiRangeSlider
        style={{ border: "none", boxShadow: "none" }}
        ruler="false"
        label="false"
        min="0"
        max={`${maxPriceData?.amount}`}
        minValue={getMinPrice! || 0}
        maxValue={getMaxPrice! || parseInt(maxPriceData?.amount)}
        onInput={(e) => {
          setMinValue2(e.minValue);
          setMaxValue2(e.maxValue);
        }}
      />

      {/* {
        minValue2 === 0 && maxValue2 === parseInt(maxPriceData?.amount) ||
        <button
          className={`btn btn-sm btn-primary w-full`}
          onClick={() => {
            priceChange(minValue2, maxValue2);
          }}
        >
          submit
        </button>
      } */}

      {(minValue2 === parseInt(getMinPrice!) &&
        maxValue2 === parseInt(getMaxPrice!)) ||
        (minValue2 === 0 && maxValue2 === parseInt(maxPriceData?.amount)) || (
          <button
            className={`btn btn-sm btn-primary w-full`}
            onClick={() => {
              priceChange(minValue2, maxValue2);
            }}
          >
            submit
          </button>
        )}
    </div>
  );
};

export default RangeSlider;
