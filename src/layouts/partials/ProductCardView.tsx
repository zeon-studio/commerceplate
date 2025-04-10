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

const ProductCardView = ({ searchParams }: { searchParams: any }) => {
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
            className="mx-auto mb-6 w-[211px] h-[184px]"
            src="/images/no-search-found.png"
            alt="no-search-found"
            width={211}
            height={184}
            priority={true}
          />
          <h1 className="h2 mb-4">No Product Found!</h1>
          <p>
            We couldn&apos;t find what you filtered for. Try filtering again.
          </p>
        </div>
      )}

      <div className="row gap-y-8 md:gap-y-14">
        {products.map((product, index) => {
          const defaultVariantId =
            product?.variants.length > 0 ? product?.variants[0].id : undefined;
          return (
            <div
              key={index}
              className="text-center col-12 sm:col-6 md:col-4 group relative"
            >
              <div className="md:relative overflow-hidden">
                <ImageFallback
                  src={
                    product.featuredImage?.url || "/images/product_image404.jpg"
                  }
                  width={312}
                  height={269}
                  alt={product.featuredImage?.altText || "fallback image"}
                  className="w-full h-[200px] sm:w-[312px] md:h-[269px] object-cover rounded-md border mx-auto"
                />

                <Suspense>
                  <AddToCart
                    variants={product?.variants}
                    availableForSale={product?.availableForSale}
                    handle={product?.handle}
                    defaultVariantId={defaultVariantId}
                    stylesClass={
                      "btn btn-primary max-md:btn-sm z-10 absolute bottom-24 md:bottom-0 left-1/2 transform -translate-x-1/2 md:translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                    }
                  />
                </Suspense>
              </div>
              <div className="py-2 md:py-4 text-center z-20">
                <h2 className="font-medium text-base md:text-xl">
                  <Link
                    className="after:absolute after:inset-0"
                    href={`/products/${product?.handle}`}
                  >
                    {product?.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 md:mt-4">
                  <span className="text-base md:text-xl font-bold text-text-dark dark:text-darkmode-text-dark">
                    {currencySymbol}{" "}
                    {product?.priceRange?.minVariantPrice?.amount}{" "}
                    {product?.priceRange?.minVariantPrice?.currencyCode}
                  </span>
                  {parseFloat(
                    product?.compareAtPriceRange?.maxVariantPrice?.amount,
                  ) > 0 ? (
                    <s className="text-text-light dark:text-darkmode-text-light text-xs md:text-base font-medium">
                      {currencySymbol}{" "}
                      {product?.compareAtPriceRange?.maxVariantPrice?.amount}{" "}
                      {
                        product?.compareAtPriceRange?.maxVariantPrice
                          ?.currencyCode
                      }
                    </s>
                  ) : (
                    ""
                  )}
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
  );
};

export default ProductCardView;
