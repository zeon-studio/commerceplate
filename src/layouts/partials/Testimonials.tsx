"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Testimonial } from "@/types";
import { useRef, useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonials = ({
  title,
  testimonials,
}: {
  title: string;
  testimonials: Array<Testimonial>;
}) => {
  const [_, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-6">
            <h2 dangerouslySetInnerHTML={markdownify(title)} className="mb-4" />
            {/* <p
              dangerouslySetInnerHTML={markdownify(
                data.frontmatter.description!,
              )}
            /> */}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={24}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              //trigger a re-render by updating the state on swiper initialization
              onInit={() => setInit(true)}
            >
              {testimonials.map((item: Testimonial, index: number) => (
                <SwiperSlide key={index}>
                  <div className="rounded-lg relative flex flex-col items-center bg-light px-7 py-10 dark:bg-darkmode-light">
                    <div className="text-text-dark dark:text-white absolute opacity-25">
                      <svg
                        width="160"
                        height="160"
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M160 110V80H140.156H120.312V78C120.312 71.9375 122.938 64 127.031 57.7812C128.969 54.8125 134.812 48.9688 137.781 47.0312C144 42.9375 151.938 40.3125 158 40.3125H160V30.1562V20H157.25C154.281 20 148.75 20.8125 144.844 21.8438C130.25 25.5937 117 35.3125 109.062 48.0937C104.656 55.2187 102 62.3437 100.594 70.9375C100.062 74.2812 100 76.7188 100 107.281V140H130H160L160 110Z"
                          fill="#D9D9D9"
                        />
                        <path
                          d="M60 110L60 80H40.1562H20.3125V78C20.3125 71.9375 22.9375 64 27.0312 57.7812C28.9687 54.8125 34.8125 48.9688 37.7812 47.0312C44 42.9375 51.9375 40.3125 58 40.3125H60V30.1562V20H57.25C54.2812 20 48.75 20.8125 44.8438 21.8438C30.25 25.5937 17 35.3125 9.0625 48.0937C4.65625 55.2187 2 62.3437 0.59375 70.9375C0.0625 74.2812 0 76.7188 0 107.281V140H30H60V110Z"
                          fill="#D9D9D9"
                        />
                      </svg>
                    </div>
                    <blockquote
                      className="mt-14 text-center mx-auto md:col-10 lg:col-8 z-10"
                      dangerouslySetInnerHTML={markdownify(item.content)}
                    />
                    <div className="mt-11 flex flex-col items-center">
                      <div className="text-text-dark dark:text-white mb-4">
                        <ImageFallback
                          height={50}
                          width={50}
                          className="rounded-full"
                          src={item.avatar}
                          alt={item.name}
                        />
                      </div>

                      <h3
                        dangerouslySetInnerHTML={markdownify(item.name)}
                        className="h5 font-primary font-semibold"
                      />
                      <p
                        dangerouslySetInnerHTML={markdownify(item.designation)}
                        className="text-text-dark dark:text-white"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div
                className={`hidden lg:flex justify-between w-full absolute top-1/2 z-10 px-6 text-text-dark ${isHovered
                  ? "opacity-100 transition-opacity duration-300 ease-in-out"
                  : "opacity-0 transition-opacity duration-300 ease-in-out"
                  }`}
              >
                <div
                  ref={prevRef}
                  className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm"
                >
                  <HiOutlineArrowNarrowLeft size={24} />
                </div>
                <div
                  ref={nextRef}
                  className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm"
                >
                  <HiOutlineArrowNarrowRight size={24} />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
