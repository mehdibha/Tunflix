import React from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "./style.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

SwiperCore.use([Navigation]);

const Slider = ({ slides }) => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={10}
                navigation
                loop
                breakpoints={{
                    360: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    560: {
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    },
                    760: {
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                    960: {
                        slidesPerView: 5,
                        slidesPerGroup: 5
                    },
                    1160: {
                        slidesPerView: 6,
                        slidesPerGroup: 6
                    },
                    1360: {
                        slidesPerView: 7,
                        slidesPerGroup: 7
                    },
                }}
            >
                {slides.map((elem) => (
                    <SwiperSlide key={elem.id}>{elem}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
