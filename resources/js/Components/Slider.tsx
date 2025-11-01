import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

interface SliderProps {
    children: React.ReactNode[]; // Expect an array of React nodes
    slidesPerView: number,
    autoplay?: boolean
}

const Slider: React.FC<SliderProps> = ({ children, slidesPerView = 1, autoplay = false }) => {
    return (
        <div>
            <Swiper
                spaceBetween={10}
                slidesPerView={slidesPerView}
                loop={true}
                autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
                modules={[Autoplay]} // Add Autoplay module to Swiper

                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1368: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                    },
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>{child}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;

