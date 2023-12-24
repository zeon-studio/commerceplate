import ProductLayouts from "@/components/product/ProductLayouts";
import LoadingProducts from "@/components/skeleton/SkeletonProducts";
import { defaultSort, sorting } from "@/lib/constants";
import { getListPage } from "@/lib/contentParser";
import {
  getCollectionProducts,
  getCollections,
  getHighestProductPrice,
  getProducts,
  getVendors,
} from "@/lib/shopify";
import { PageInfo, Product } from "@/lib/shopify/types";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import ProductCardView from "@/partials/ProductCardView";
import ProductFilters from "@/partials/ProductFilters";
import ProductListView from "@/partials/ProductListView";
import { Suspense } from "react";

interface SearchParams {
  sort?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  b?: string;
  c?: string;
  t?: string;
}

const ShowProducts = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    b: brand,
    c: category,
    t: tag,
  } = searchParams as {
    [key: string]: string;
  };

  const { layout, cursor } = searchParams as { [key: string]: string };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let productsData: any;
  let vendorsWithCounts: { vendor: string; productCount: number }[] = [];
  let categoriesWithCounts: { category: string; productCount: number }[] = [];

  if (searchValue || brand || minPrice || maxPrice || category || tag) {
    let queryString = "";

    if (minPrice || maxPrice) {
      queryString += `variants.price:<=${maxPrice} variants.price:>=${minPrice}`;
    }

    if (searchValue) {
      queryString += ` ${searchValue}`;
    }

    if (brand) {
      Array.isArray(brand)
        ? (queryString += `${brand.map((b) => `(vendor:${b})`).join(" OR ")}`)
        : (queryString += `vendor:"${brand}"`);
    }

    if (tag) {
      queryString += ` ${tag}`;
    }

    const query = {
      sortKey,
      reverse,
      query: queryString,
      cursor,
    };

    productsData =
      category && category !== "all"
        ? await getCollectionProducts({
            collection: category,
            sortKey,
            reverse,
          })
        : await getProducts(query);

    const uniqueVendors: string[] = [
      ...new Set(
        ((productsData?.products as Product[]) || []).map((product: Product) =>
          String(product?.vendor || ""),
        ),
      ),
    ];

    const uniqueCategories: string[] = [
      ...new Set(
        ((productsData?.products as Product[]) || []).flatMap(
          (product: Product) =>
            product.collections.nodes.map(
              (collectionNode: any) => collectionNode.title || "",
            ),
        ),
      ),
    ];

    vendorsWithCounts = uniqueVendors.map((vendor: string) => {
      const productCount = (productsData?.products || []).filter(
        (product: Product) => product?.vendor === vendor,
      ).length;
      return { vendor, productCount };
    });

    categoriesWithCounts = uniqueCategories.map((category: string) => {
      const productCount = ((productsData?.products as Product[]) || []).filter(
        (product: Product) =>
          product.collections.nodes.some(
            (collectionNode: any) => collectionNode.title === category,
          ),
      ).length;
      return { category, productCount };
    });
  } else {
    // Fetch all products
    productsData = await getProducts({ sortKey, reverse, cursor });
  }
  // console.log(categoriesWithCounts)
  const categories = await getCollections();
  const vendors = await getVendors({});

  const tags = [
    ...new Set(
      (
        productsData as { pageInfo: PageInfo; products: Product[] }
      )?.products.flatMap((product: Product) => product.tags),
    ),
  ];

  const maxPriceData = await getHighestProductPrice();

  return (
    <>
      <ProductLayouts
        categories={categories}
        vendors={vendors}
        tags={tags}
        maxPriceData={maxPriceData}
        vendorsWithCounts={vendorsWithCounts}
        categoriesWithCounts={categoriesWithCounts}
      />

      <div className="container">
        <div className="row">
          <div className="col-3 hidden lg:block">
            <ProductFilters
              categories={categories}
              vendors={vendors}
              tags={tags}
              maxPriceData={maxPriceData!}
              vendorsWithCounts={vendorsWithCounts}
              categoriesWithCounts={categoriesWithCounts}
            />
          </div>

          <div className="col-12 lg:col-9">
            {layout === "list" ? (
              <ProductListView searchParams={searchParams} />
            ) : (
              <ProductCardView searchParams={searchParams} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsListPage = ({ searchParams }: { searchParams: any }) => {
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <PageHeader title={"Products"} />
      <Suspense fallback={<LoadingProducts />}>
        <ShowProducts searchParams={searchParams} />
      </Suspense>

      <CallToAction data={callToAction} />
    </>
  );
};

export default ProductsListPage;
