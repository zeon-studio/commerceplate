import Social from "@/components/Social";
import { AddToCart } from "@/components/cart/AddToCart";
import LoadingProductGallery from "@/components/loadings/skeleton/SkeletonProductGallery";
import ProductGallery from "@/components/product/ProductGallery";
import ShowTags from "@/components/product/ShowTags";
import Tabs from "@/components/product/Tabs";
import { VariantSelector } from "@/components/product/VariantSelector";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import LatestProducts from "@/partials/FeaturedProducts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProduct(params.slug);
  if (!product) return notFound();
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
};

const ProductSingle = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return (
    <Suspense fallback={<LoadingProductGallery />}>
      <ShowProductSingle params={params} />
    </Suspense>
  );
};

export default ProductSingle;

const ShowProductSingle = async ({ params }: { params: { slug: string } }) => {
  const paymentsAndDelivery = getListPage("sections/payments-and-delivery.md");
  const { payment_methods, estimated_delivery } =
    paymentsAndDelivery.frontmatter;

  const { currencySymbol } = config.shopify;
  const product = await getProduct(params.slug);

  if (!product) return notFound();
  const {
    id,
    title,
    description,
    descriptionHtml,
    priceRange,
    compareAtPriceRange,
    images,
    options,
    variants,
    tags,
  } = product;

  const relatedProducts = await getProductRecommendations(id);

  const defaultVariantId = variants.length > 0 ? variants[0].id : undefined;

  return (
    <>
      <section className="md:section-sm">
        <div className="container">
          <div className="row justify-center">
            {/* right side contents  */}
            <div className="col-10 md:col-8 lg:col-6">
              <Suspense>
                <ProductGallery images={images} />
              </Suspense>
            </div>

            {/* left side contents  */}
            <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
              <h1 className="text-3xl md:h2 mb-2 md:mb-6">{title}</h1>

              <div className="flex gap-2 items-center">
                <h4 className="text-text-light dark:text-darkmode-text-light max-md:h2">
                  {currencySymbol} {priceRange?.minVariantPrice.amount}{" "}
                  {priceRange?.minVariantPrice?.currencyCode}
                </h4>
                {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) > 0 ? (
                  <s className="text-text-light max-md:h3 dark:text-darkmode-text-light">
                    {currencySymbol}{" "}
                    {compareAtPriceRange?.maxVariantPrice?.amount}{" "}
                    {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                  </s>
                ) : (
                  ""
                )}
              </div>

              <div className="my-10 md:my-10 space-y-6 md:space-y-10">
                <div>
                  {options && (
                    <VariantSelector
                      options={options}
                      variants={variants}
                      images={images}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-8 md:mt-10 mb-6">
                <Suspense>
                  <AddToCart
                    variants={product?.variants}
                    availableForSale={product?.availableForSale}
                    stylesClass={"btn max-md:btn-sm btn-primary"}
                    handle={null}
                    defaultVariantId={defaultVariantId}
                  />
                </Suspense>
              </div>

              <div className="mb-8 md:mb-10">
                <p className="p-2 max-md:text-sm rounded-md bg-light dark:bg-darkmode-light inline">
                  {estimated_delivery}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h5 className="max-md:text-base">Payment: </h5>
                {payment_methods?.map(
                  (payment: { name: string; image_url: string }) => (
                    <Image
                      key={payment.name}
                      src={payment.image_url}
                      alt={payment.name}
                      width={44}
                      height={32}
                      className="w-[44px] h-[32px]"
                    />
                  ),
                )}
              </div>

              <hr className="my-6 border border-border dark:border-border/40" />

              <div className="flex gap-3 items-center mb-6">
                <h5 className="max-md:text-base">Share:</h5>
                <Social socialName={title} className="social-icons" />
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-3 items-center">
                  <h5 className="max-md:text-base">Tags:</h5>
                  <Suspense>
                    <ShowTags tags={tags} />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description of a product  */}
      {description && (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-10 lg:col-11 mx-auto mt-12">
                <Tabs descriptionHtml={descriptionHtml} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recommended Products section  */}
      <section className="section">
        <div className="container">
          {relatedProducts?.length > 0 && (
            <>
              <div className="text-center mb-6 md:mb-14">
                <h2 className="mb-2">Related Products</h2>
              </div>
              <LatestProducts products={relatedProducts.slice(0, 4)} />
            </>
          )}
        </div>
      </section>
    </>
  );
};
