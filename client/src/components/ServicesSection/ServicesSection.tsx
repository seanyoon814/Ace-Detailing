import './ServicesSection.css';

import aceDetailing from '../../constants/aceDetailing';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import {useNavigate} from 'react-router-dom'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React from 'react';
import toyota from '../../images/toyota.jpg'
function ServicesSection() {
    const navigate = useNavigate();
    const handleRedirect = (url:string) =>{
        navigate(url);
    }
    return (
        <section>
            <p className='paragraph-noanim lato-light' style={{fontSize:'2em'}}>OUR SERVICES</p>
            <h1 className='quote header lato-light'>WHERE <span className='highlight'><i>EXPERIENCE</i></span> MEETS <span className='highlight'><i>PERFECTIONISM.</i></span></h1>
            <Swiper
                modules={[Navigation, EffectCoverflow]}
                grabCursor={true}
                navigation
                centeredSlides={true}
                slidesPerView={"auto"}
                loop
                effect='coverflow'
                speed={200}
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
                            key={service.name} style={{backgroundColor:'black', border:'1px white solid'}}
                        >
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-12 text-center'>
                                        <img className="img-fluid" src={toyota}></img>
                                        <h1 className='paragraph-noanim lato-light mt-3' style={{fontSize:'2.5em'}}>{service.name}</h1>
                                        <p className='header garmond mt-3' style={{fontSize:'1.2em'}}><i>{service.description}</i></p>
                                        <button className="btn btn-dark mt-3" onClick={() => handleRedirect(service.relativeUrl)}>View More</button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
}

export default ServicesSection;
