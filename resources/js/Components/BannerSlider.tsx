import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface SliderProps {
    children: React.ReactNode[]; // Expect an array of React nodes
    slidesPerView?: number
}

const BannerSlider: React.FC<SliderProps> = ({ children, slidesPerView = 5 }) => {
    return (
        <section className="banner-slider hero-section-inner-slider position-relative">
            <Swiper
                spaceBetween={10}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                       pagination={{
                    clickable: true,
                }}
                className="owl-carousel"
            modules={[Pagination, Autoplay]}
                navigation={true}
                slidesPerView={slidesPerView}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                }}
            >
                <div className="owl-carousel owl-theme position-relative" >
                    {React.Children.map(children, (child, index) => (
                        <SwiperSlide className="owl-item" key={index}>{child}</SwiperSlide>
                    ))}
                </div>
            </Swiper>
            </section>
    );
};

export default BannerSlider;

