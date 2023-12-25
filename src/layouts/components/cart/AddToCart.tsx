"use client";

import { ProductVariant } from "@/lib/shopify/types";
import { addItem } from "@/lib/utils/cartActions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { BiLoaderAlt } from "react-icons/bi";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  stylesClass,
  handle,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  stylesClass: string;
  handle: string | null;
}) {
  const { pending } = useFormStatus();
  const buttonClasses = stylesClass;
  const disabledClasses = "cursor-not-allowed flex";

  const DynamicTag = handle === null ? "button" : Link;

  if (!availableForSale) {
    return (
      <button
        disabled
        aria-disabled
        className={`${buttonClasses} ${disabledClasses}`}
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <DynamicTag
        href={`/products/${handle}`}
        aria-label="Please select an option"
        aria-disabled
        className={`${buttonClasses} ${
          DynamicTag === "button" && disabledClasses
        }`}
      >
        Select Variant
      </DynamicTag>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending ? "true" : "false"}
      className={`${buttonClasses}`}
    >
      {pending ? (
        <BiLoaderAlt
          className={`animate-spin w-[70px] md:w-[85px]`}
          size={26}
        />
      ) : (
        "Add To Cart"
      )}
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  stylesClass,
  handle,
  defaultVariantId,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  stylesClass: string;
  handle: string | null;
  defaultVariantId: string | undefined;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();

  // Find the variant based on selected options
  const selectedOptions = Array.from(searchParams.entries());
  const variant = variants.find((variant: ProductVariant) =>
    selectedOptions.every(([key, value]) =>
      variant.selectedOptions.some(
        (option) => option.name.toLowerCase() === key && option.value === value,
      ),
    ),
  );

  // Use the default variant ID if no variant is found
  const selectedVariantId = variant?.id || defaultVariantId;

  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        stylesClass={stylesClass}
        handle={handle}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
