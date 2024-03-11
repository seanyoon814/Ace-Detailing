import './ServicesSection.css';

import aceDetailing from '../../constants/aceDetailing';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

function ServicesSection() {
    return (
        <section>
            <h1>Services</h1>
            <Swiper
                modules={[Navigation, EffectCoverflow]}
                grabCursor={true}
                navigation
                centeredSlides={true}
                slidesPerView={"auto"}
                loop
                effect='coverflow'
                speed={1000}
                coverflowEffect={{
                    rotate: 0,
                    slideShadows: false,
                    scale: 1,
                    depth: 350,
                }}
            >
                {
                    aceDetailing.services.map(service =>
                        <SwiperSlide
                            key={service.name}
                        >
                            <img></img>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
}

export default ServicesSection;
