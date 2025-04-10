"use client";

import ShowTags from "@/components/product/ShowTags";
import RangeSlider from "@/components/rangeSlider/RangeSlider";
import { ShopifyCollection } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";
import { slugify } from "@/lib/utils/textConverter";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BsCheckLg } from "react-icons/bs";

const ProductFilters = ({
  categories,
  vendors,
  tags,
  maxPriceData,
  vendorsWithCounts,
  categoriesWithCounts,
}: {
  categories: ShopifyCollection[];
  vendors: { vendor: string; productCount: number }[];
  tags: string[];
  maxPriceData: { amount: string; currencyCode: string };
  vendorsWithCounts: { vendor: string; productCount: number }[];
  categoriesWithCounts: { category: string; productCount: number }[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedBrands = searchParams.getAll("b");
  const selectedCategory = searchParams.get("c");

  const handleBrandClick = (name: string) => {
    const slugName = slugify(name.toLowerCase());
    const newParams = new URLSearchParams(searchParams.toString());

    const currentBrands = newParams.getAll("b");

    if (currentBrands.includes(slugName)) {
      newParams.delete("b", slugName);
    } else {
      newParams.append("b", slugName);
    }
    router.push(createUrl("/products", newParams), { scroll: false });
  };

  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (handle === selectedCategory) {
      newParams.delete("c");
    } else {
      newParams.set("c", handle);
    }
    router.push(createUrl("/products", newParams), { scroll: false });
  };

  return (
    <div>
      <div>
        <h5 className="mb-2 lg:text-xl">Select Price Range</h5>
        <hr className="border-border dark:border-darkmode-border" />
        <div className="pt-4">
          <Suspense>
            <RangeSlider maxPriceData={maxPriceData} />
          </Suspense>
        </div>
      </div>

      <div>
        <h5 className="mb-2 mt-4 lg:mt-6 lg:text-xl">Product Categories</h5>
        <hr className="border-border dark:border-darkmode-border" />
        <ul className="mt-4 space-y-4">
          {categories.map((category) => (
            <li
              key={category.handle}
              className={`flex items-center justify-between cursor-pointer ${selectedCategory === category.handle
                ? "text-text-dark dark:text-darkmode-text-dark font-semibold"
                : "text-text-light dark:text-darkmode-text-light"
                }`}
              onClick={() => handleCategoryClick(category.handle)}
            >
              {category.title}{" "}
              {searchParams.has("c") && !searchParams.has("b") ? (
                <span>({category?.products?.edges.length!})</span>
              ) : (
                <span>
                  {categoriesWithCounts.length > 0
                    ? `(${categoriesWithCounts.find(
                      (c) => c.category === category.title,
                    )?.productCount || 0
                    })`
                    : `(${category?.products?.edges.length!})`}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {vendors && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Brands</h5>
          <hr className="border-border dark:border-darkmode-border" />
          <ul className="mt-4 space-y-4">
            {vendors.map((vendor) => (
              <li
                key={vendor.vendor}
                className={`flex items-center justify-between cursor-pointer text-text-light dark:text-darkmode-text-light`}
                onClick={() => handleBrandClick(vendor.vendor)}
              >
                {searchParams.has("b") &&
                  !searchParams.has("c") &&
                  !searchParams.has("minPrice") &&
                  !searchParams.has("maxPrice") &&
                  !searchParams.has("q") &&
                  !searchParams.has("t") ? (
                  <span>
                    {vendor.vendor} ({vendor.productCount})
                  </span>
                ) : (
                  <span>
                    {vendorsWithCounts.length > 0
                      ? `${vendor.vendor} (${vendorsWithCounts.find(
                        (v) => v.vendor === vendor.vendor,
                      )?.productCount || 0
                      })`
                      : `${vendor.vendor} (${vendor.productCount})`}
                  </span>
                )}
                <div className="h-4 w-4 rounded-sm flex items-center justify-center border border-border dark:border-border/40">
                  {selectedBrands.map((b, i) =>
                    slugify(vendor.vendor.toLowerCase()) === b ? (
                      <span key={i}>
                        <BsCheckLg size={16} />
                      </span>
                    ) : null,
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Tags</h5>
          <hr className="border-border dark:border-darkmode-border" />
          <div className="mt-4">
            <Suspense>
              {" "}
              <ShowTags tags={tags} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
