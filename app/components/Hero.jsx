"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Hero() {
  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      grabCursor={true}          // shows hand cursor while dragging
      allowTouchMove={true}      // ensure touch/mouse dragging is allowed
      simulateTouch={true}       // desktop mouse behaves like touch (default true)
      touchRatio={1}             // sensitivity
      style={{ touchAction: "pan-y" }} // lets page scroll vertically while slider handles horizontal swipes
      className="myswiper"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <SwiperSlide key={i}>
          <img
            src={`/images/banner${i + 1}.jpg`}
            alt={`Banner ${i + 1}`}
            draggable={false}                    
            onDragStart={(e) => e.preventDefault()}
            className="max-h-[500px] w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
