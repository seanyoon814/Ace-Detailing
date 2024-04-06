import './AboutSection.css';
import NL272 from '../NL272Section/NL272';
import DetailGarage from '../DetailGarageVancouver/DetailGarageVancouver';
import Labocosmetica from '../Labocosmetica/Labocosmetica';

import car1 from '../../images/car_1.jpg';
import car2 from '../../images/car_2.jpg';
import car3 from '../../images/car_3.jpg';
import toyota from '../../images/toyota.jpg'
import pfp from '../../images/pfp.png';
import nl272img from '../../images/nl272.png';
import { useState } from 'react';
import React from 'react';
function AboutSection() {
    const [nl272, setNL272] = useState(true);
    const [labo, setLabo] = useState(false);
    const [detailGarage, setDetailGarage] = useState(false);

    const showNL272 = () => {
        setNL272(true);
        setLabo(false);
        setDetailGarage(false);
    }

    const showLabo = () => {
        setNL272(false);
        setLabo(true);
        setDetailGarage(false);
    }

    const showDetailGarage = () => {
        setNL272(false);
        setLabo(false);
        setDetailGarage(true);
    }

    return (
    <div className='container-fluid' style={{ backgroundColor: "black" }}>
        <div className='row justify-content-center' style={{marginTop:'5vh'}}>
            <div className="col-12 text-center pb-5">
            <p className='paragraph-noanim lato-light' style={{fontSize:'2em'}}>WHO WE ARE</p>
            <h1 className='quote header instrument-sans'>A TEAM OF <span className='highlight'><i>CERTIFIED &amp; DEDICATED</i></span> DETAILERS.</h1>
            </div>
            <div className="col-4">
                <p className="paragraph-noanim instrument-sans">Ace Detailing consists of industry-experienced + multiaccredited ceramic coating installers. Our team delivers
                cutting-edge results for customers looking for premium
                automotive exterior &amp; interior refinishing services
                </p>
                <p className='paragraph-noanim instrument-sans'>The company mission involves helping our customers receive the
                products & results they desire. We develop a customized price
                matrix for all clients to ensure they have the flexibility to opt in to
                any of our products at the best pricing and quality available.
                </p>
                <p className='paragraph-noanim instrument-sans'>Our goal is to push the industry standards to
                incorporate effective business SOPs - allowing us to
                provide maximized margins & value of service for
                customers looking for the best of the best. </p>
            </div>
            <div className="col-6">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={car1} className="d-block w-100 img-rounded" alt="..."></img>
                        <div className="carousel-caption d-none d-md-block">
                            <h5 style={{color:'black'}}>PERFECTION.</h5>
                            <p style={{color:'black'}}>At our company, perfection is not just a goal; it's our standard</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={car2} className="d-block w-100 img-rounded" alt="..."></img>
                        <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={car3} className="d-block w-100 img-rounded" alt="..."></img>
                        <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>
                </div>
            </div>
            <div className='col-12 world text-center' style={{marginTop:'5vh', border:'#71706e 1px solid'}}>
                <div className='col-4'>
                    <p className='header garmond' style={{fontWeight:'800'}}><i>500+ Customers</i></p>
                </div>
                <div className='col-4'>
                    <p className='header garmond' style={{fontWeight:'800'}}><i>10+ Years of Experience</i></p>
                </div>
                <div className='col-4'>
                    <p className='header garmond' style={{fontWeight:'800'}}><i>Proudly Partnered With BC Suppliers</i></p>
                </div>
            </div>
            
            <div className='col-12 text-center pb-5' style={{marginTop:'5vh'}}>
            <p className='paragraph-noanim lato-light' style={{fontSize:'2em'}}>WHAT WE OFFER</p>
                <h1 className='quote header instrument-sans'>A WIDE RANGE OF  <span className='highlight'><i>PREMIUM DETAILING SERVICES.</i></span></h1>
            </div>
            <div className='col-4'>
                <p className='paragraph-noanim instrument-sans' style={{float:'left'}}>Our team of detailing specialists provide over 10+ years of
                experience within the professional-grade production detailing
                industry. All of our CarFax registered & warrantied coating services
                are carried out by certified professional installers with active
                credentials from Nasiol, Labocosmetica, Chemical Guys, and more.
                </p>
                <p className='paragraph-noanim instrument-sans'>Ace Detailing always offers complimentary service consultations to
                all customers, ensuring quality of service is never compromised.
                </p>
                <p className='paragraph-noanim instrument-sans'>We are proudly partnered with BC-local detailing supply distributors
                for professional-grade equipment & supplies.
                </p>
            </div>
            <div className='col-3 text-center'>
                <img src={pfp} alt='Koichi Endo' className='pfp' style={{maxWidth:'100%', maxHeight:'auto'}}></img>
                <p className='paragraph instrument-sans fade-right'><i>Koichi Endo</i></p>
                <p className='paragraph instrument-sans fade-right' style={{fontSize:'1em'}}>Founder and Lead Detailer</p>
                <p className='paragraph instrument-sans fade-right' style={{fontSize:'1em'}}>Certified Detailing Instructor</p>
            </div>
            <div className='col-3 text-center'>
                <img src={pfp} alt='Matthew Cachero' className='pfp' style={{maxWidth:'100%', maxHeight:'auto'}}></img>
                <p className='paragraph instrument-sans fade-right'><i>Matthew Cachero</i></p>
                <p className='paragraph instrument-sans fade-right' style={{fontSize:'1em'}}>Co-Founder and Detailer</p>
                <p className='paragraph instrument-sans fade-right' style={{fontSize:'1em'}}>Certified Detailing</p>
            </div>
        </div>
        <div className='row justify-content-center'>
        <div className="col-6 mt-5" style={{padding:'0'}}>
                <img className="panelImg" src={car1} alt="Card image cap"></img>
                <div className="text-overlay">
                    <h1 className="header garmond">SERVICES</h1>
                    <p className='paragraph-noanim instrument-sans'><i>Discover More <i className="fa-solid fa-circle-arrow-right"></i></i></p>
                </div>
            </div>
            <div className="col-6 mt-5" style={{padding:'0'}}>
                <img className="panelImg" src={car2} alt="Card image cap"></img>
                <div className="text-overlay">
                        <h1 className="header garmond">PRODUCTS</h1>
                        <p className='paragraph-noanim instrument-sans'><i>Discover More <i className="fa-solid fa-circle-arrow-right"></i></i></p>
                    </div>
            </div>
            <div className="col-6" style={{padding:'0'}}>
                <img className="panelImg" src={toyota} alt="Card image cap"></img>
                <div className="text-overlay">
                        <h1 className="header garmond">USER BLOG</h1>
                        <p className='paragraph-noanim instrument-sans'><i>Discover More <i className="fa-solid fa-circle-arrow-right"></i></i></p>
                    </div>
            </div>
            <div className="col-6" style={{padding:'0'}}>
                <img className="panelImg" src={car3} alt="Card image cap"></img>
                <div className="text-overlay">
                        <h1 className="header garmond">FAQs</h1>
                        <p className='paragraph-noanim instrument-sans'><i>Discover More <i className="fa-solid fa-circle-arrow-right"></i></i></p>
                    </div>
            </div>
        </div>
        <div className='row justify-content-center'>             
        <div className='col-12 text-center pb-5' style={{marginTop:'10vh'}}>
        <p className='paragraph-noanim lato-light' style={{fontSize:'2em'}}>OUR PRODUCTS</p>
                <h1 className='quote header instrument-sans'>UTILIZE <span className='highlight'><i>WORLD-CLASS</i></span> STANDARDS.</h1>
            </div>
            <div className='col-12 text-center'>
                <button onClick={showNL272} className='btn btn-danger'>NL272</button>
                <button onClick={showLabo} className='btn btn-danger'>Labocosmetica</button>
                <button onClick={showDetailGarage} className='btn btn-danger'>Detail Garage</button>
            </div>
        </div>
        {nl272 && <NL272/>}
        {labo && <Labocosmetica/>}
        {detailGarage && <DetailGarage/>}
        {/* <DetailGarage/>
        <Labocosmetica/> */}
    </div>

    );
}

// Define the callback function
function animateWhenVisible(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
    const observers = new IntersectionObserver(animateWhenVisible, { threshold: 0.5 });
    document.querySelectorAll('.element-to-animate').forEach(el => {
        observers.observe(el);
    });
}


export default AboutSection;
