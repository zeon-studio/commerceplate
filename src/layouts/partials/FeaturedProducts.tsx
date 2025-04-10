"use client";
import { AddToCart } from "@/components/cart/AddToCart";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { Product } from "@/lib/shopify/types";
import Link from "next/link";

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  const { currencySymbol } = config.shopify;

  return (
    <>
      <div className="row">
        {products.map((product: any) => {
          const {
            id,
            title,
            handle,
            featuredImage,
            priceRange,
            variants,
            compareAtPriceRange,
          } = product;

          const defaultVariantId =
            variants.length > 0 ? variants[0].id : undefined;
          return (
            <div
              key={id}
              className="text-center col-6 md:col-4 lg:col-3 mb-8 md:mb-14 group relative"
            >
              <div className="relative overflow-hidden">
                <ImageFallback
                  src={featuredImage?.url || "/images/product_image404.jpg"}
                  width={312}
                  height={269}
                  alt={featuredImage?.altText || "fallback image"}
                  className="w-[312px] h-[150px] md:h-[269px] object-cover border border-border rounded-md"
                />

                <AddToCart
                  variants={product.variants}
                  availableForSale={product.availableForSale}
                  handle={handle}
                  defaultVariantId={defaultVariantId}
                  stylesClass={
                    "btn btn-primary max-md:btn-sm z-10 absolute bottom-12 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                  }
                />
              </div>
              <div className="py-2 md:py-4 text-center z-20">
                <h2 className="font-medium text-base md:text-xl">
                  <Link
                    className="after:absolute after:inset-0"
                    href={`/products/${handle}`}
                  >
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 md:mt-4">
                  <span className="text-base md:text-xl font-bold text-text-dark dark:text-darkmode-text-dark">
                    {currencySymbol}{" "}
                    {priceRange.minVariantPrice.amount}{" "}
                    {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                  </span>

                  {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) >
                    0 ? (
                    <s className="text-text-light dark:text-darkmode-text-light text-xs md:text-base font-medium">
                      {currencySymbol}{" "}
                      {compareAtPriceRange?.maxVariantPrice.amount}{" "}
                      {compareAtPriceRange?.maxVariantPrice?.currencyCode}
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

      <div className="flex justify-center">
        <Link
          className="btn btn-sm md:btn-lg btn-primary font-medium"
          href={"/products"}
        >
          + See All Products
        </Link>
      </div>
    </>
  );
};

export default FeaturedProducts;
