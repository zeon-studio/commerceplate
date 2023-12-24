"use client";
import ImageFallback from "@/helpers/ImageFallback";
import { Product } from "@/lib/shopify/types";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlider = ({ products }: { products: Product[] }) => {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "banner-pagination-bullet",
          bulletActiveClass: "banner-pagination-bullet-active",
        }}
        modules={[Pagination]}
      >
        {products?.map((item: Product) => (
          <SwiperSlide key={item.id}>
            <div className="row items-center px-7 xl:px-16">
              <div className="sm:col-12 lg:col-6 order-2 lg:order-0">
                <div className="text-center py-10 lg:py-0">
                  {item?.description && (
                    <p className="mb-2 lg:mb-3 text-light dark:text-darkmode-light font-medium md:text-xl">
                      {item.description}
                    </p>
                  )}
                  <div className="row">
                    <h1 className="mb-4 lg:mb-10 col-10 sm:col-8 lg:col-12 mx-auto">
                      {item.title}
                    </h1>
                  </div>
                  {item.handle && (
                    <Link
                      className="btn btn-sm md:btn-lg btn-primary font-medium"
                      href={`products/${item.handle}`}
                    >
                      Shop Now
                    </Link>
                  )}
                </div>
              </div>

              <div className="sm:col-12 lg:col-6">
                {item.featuredImage && (
                  <ImageFallback
                    src={item.featuredImage.url}
                    className="mx-auto w-[388px] lg:w-full"
                    width={507}
                    height={385}
                    alt="banner image"
                    priority
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroSlider;
