"use client";

import { AddToCart } from "@/components/cart/AddToCart";
import SkeletonCards from "@/components/loadings/skeleton/SkeletonCards";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import useLoadMore from "@/hooks/useLoadMore";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";
import { PageInfo, Product } from "@/lib/shopify/types";
import { titleify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const ProductListView = ({ searchParams }: { searchParams: any }) => {
  const { currencySymbol } = config.shopify;
  const [isLoading, setIsLoading] = useState(true);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{
    products: Product[];
    pageInfo: PageInfo;
  }>({
    products: [],
    pageInfo: { endCursor: "", hasNextPage: false, hasPreviousPage: false },
  });

  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    b: brand,
    c: category,
    t: tag,
    cursor,
  } = searchParams as {
    [key: string]: string;
  };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let productsData;

        if (
          searchValue ||
          brand ||
          minPrice ||
          maxPrice ||
          category ||
          tag ||
          cursor
        ) {
          let queryString = "";
          let filterCategoryProduct = [];

          if (minPrice && maxPrice) {
            filterCategoryProduct.push({
              price: {
                min:
                  minPrice !== undefined && minPrice !== ""
                    ? parseFloat(minPrice)
                    : 0,
                max:
                  maxPrice !== undefined && maxPrice !== ""
                    ? parseFloat(maxPrice)
                    : Number.POSITIVE_INFINITY,
              },
            });
          }

          if (minPrice || maxPrice) {
            queryString += `variants.price:<=${maxPrice} variants.price:>=${minPrice}`;
          }

          if (searchValue) {
            queryString += ` ${searchValue}`;
          }

          if (brand) {
            Array.isArray(brand)
              ? (queryString += `${brand
                .map((b) => `(vendor:${b})`)
                .join(" OR ")}`)
              : (queryString += `vendor:"${brand}"`);

            if (Array.isArray(brand) && brand.length > 0) {
              brand.forEach((b) => {
                filterCategoryProduct.push({
                  productVendor: titleify(b),
                });
              });
            } else {
              filterCategoryProduct.push({
                productVendor: titleify(brand),
              });
            }
          }

          if (tag) {
            queryString += ` ${tag}`;

            filterCategoryProduct.push({
              tag: tag.charAt(0).toUpperCase() + tag.slice(1),
            });
          }

          const query = {
            sortKey,
            reverse,
            query: queryString,
          };

          productsData =
            category && category !== "all"
              ? await getCollectionProducts({
                collection: category,
                sortKey,
                reverse,
                filterCategoryProduct:
                  filterCategoryProduct.length > 0
                    ? filterCategoryProduct
                    : undefined,
              })
              : await getProducts({ ...query, cursor });
        } else {
          // Fetch all products
          productsData = await getProducts({ sortKey, reverse, cursor });
        }

        setData({
          products: productsData.products,
          pageInfo: productsData.pageInfo!,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    cursor,
    sortKey,
    searchValue,
    brand,
    minPrice,
    maxPrice,
    category,
    tag,
    reverse,
  ]);

  const { products, pageInfo } = data;
  const endCursor = pageInfo?.endCursor || "";
  const hasNextPage = pageInfo?.hasNextPage || false;

  useLoadMore(targetElementRef as React.RefObject<HTMLElement>, () => {
    if (hasNextPage && !isLoading) {
      fetchDataWithNewCursor(endCursor);
    }
  });

  const fetchDataWithNewCursor = async (newCursor: string) => {
    // setIsLoading(true);

    try {
      const res = await getProducts({
        sortKey,
        reverse,
        query: searchValue,
        cursor: newCursor,
      });

      setData({
        products: [...products, ...res.products],
        pageInfo: res.pageInfo,
      });
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonCards />;
  }

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <section>
      <div ref={targetElementRef} className="row">
        {searchValue ? (
          <p className="mb-4">
            {products.length === 0
              ? "There are no products that match "
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : null}

        {products?.length === 0 && (
          <div className="mx-auto pt-5 text-center">
            <ImageFallback
              className="mx-auto mb-6"
              src="/images/no-search-found.png"
              alt="no-search-found"
              width={211}
              height={184}
            />
            <h1 className="h2 mb-4">No Product Found!</h1>
            <p>
              We couldn&apos;t find what you filtered for. Try filtering again.
            </p>
          </div>
        )}

        <div className="row space-y-10">
          {products?.map((product: Product) => {
            const {
              id,
              title,
              variants,
              handle,
              featuredImage,
              priceRange,
              description,
              compareAtPriceRange,
            } = product;

            const defaultVariantId =
              variants.length > 0 ? variants[0].id : undefined;

            return (
              <div className="col-12" key={id}>
                <div className="row">
                  <div className="col-4">
                    <ImageFallback
                      src={featuredImage?.url || "/images/product_image404.jpg"}
                      // fallback={'/images/category-1.png'}
                      width={312}
                      height={269}
                      alt={featuredImage?.altText || "fallback image"}
                      className="w-[312px] h-[150px] md:h-[269px] object-cover border border-border dark:border-darkmode-border rounded-md"
                    />
                  </div>

                  <div className="col-8 py-3 max-md:pt-4">
                    <h2 className="font-bold md:font-normal h4">
                      <Link href={`/products/${handle}`}>{title}</Link>
                    </h2>

                    <div className="flex items-center gap-x-2 mt-2">
                      <span className="text-text-light dark:text-darkmode-text-light text-xs md:text-lg font-bold">
                        ৳ {priceRange?.minVariantPrice?.amount}{" "}
                        {priceRange?.minVariantPrice?.currencyCode}
                      </span>
                      {parseFloat(
                        compareAtPriceRange?.maxVariantPrice?.amount,
                      ) > 0 ? (
                        <s className="text-text-light dark:text-darkmode-text-light text-xs md:text-base font-medium">
                          {currencySymbol}{" "}
                          {compareAtPriceRange?.maxVariantPrice?.amount}{" "}
                          {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                        </s>
                      ) : (
                        ""
                      )}
                    </div>

                    <p className="max-md:text-xs text-text-light dark:text-darkmode-text-light my-4 md:mb-8 line-clamp-1 md:line-clamp-3">
                      {description}
                    </p>
                    <Suspense>
                      <AddToCart
                        variants={product?.variants}
                        availableForSale={product?.availableForSale}
                        handle={handle}
                        defaultVariantId={defaultVariantId}
                        stylesClass={
                          "btn btn-outline-primary max-md:btn-sm drop-shadow-md"
                        }
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className={
            hasNextPage || isLoading
              ? "opacity-100 flex justify-center"
              : "opacity-0 hidden"
          }
        >
          <BiLoaderAlt className={`animate-spin`} size={30} />
        </p>
      </div>
    </section>
  );
};

export default ProductListView;
