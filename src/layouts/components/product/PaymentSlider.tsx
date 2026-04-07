"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PaymentSlider = ({ paymentMethods }: { paymentMethods: any }) => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      // navigation={true}
      slidesPerView={5}
      spaceBetween={10}
      breakpoints={{
        640: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 7,
        },
        1024: {
          slidesPerView: 7,
        },
      }}
      navigation={{
        prevEl,
        nextEl,
      }}
    >
      {paymentMethods.map((item: any) => (
        <SwiperSlide key={item.id}>
          <ImageFallback
            src={item.paymentMethodLogo}
            width={44}
            height={32}
            alt={item.paymentMethodName}
          />
        </SwiperSlide>
      ))}

      <button ref={setPrevEl} className="hidden" />
      <button ref={setNextEl} className="p-2 border rounded-md cursor-pointer">
        <BsChevronRight />
      </button>
    </Swiper>
  );
};

export default PaymentSlider;
