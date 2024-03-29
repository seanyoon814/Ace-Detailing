import './AboutSection.css';
import NL272 from '../NL272Section/NL272';
import DetailGarage from '../DetailGarageVancouver/DetailGarageVancouver';
import Labocosmetica from '../Labocosmetica/Labocosmetica';

import car1 from '../../images/car_1.jpg';
import car2 from '../../images/car_2.jpg';
import car3 from '../../images/car_3.jpg';
import pfp from '../../images/pfp.png';
import nl272 from '../../images/nl272.png';
import world from '../../images/world.jpg'
function AboutSection() {
    return (
    <div className='container-fluid' style={{ backgroundColor: "black" }}>
        <div className='row justify-content-center pt-5'>
            <div className="col-12 text-center pb-5 pt-5">
            <h1 className='quote header instrument-sans'>WE BUILT A TEAM OF <span className='highlight'><i>CERTIFIED &amp; DEDICATED</i></span> DETAILERS.</h1>
            </div>
            <div className="col-3">
                <p className="paragraph-noanim instrument-sans">Ace Detailing consists of industry-experienced + multiaccredited ceramic coating installers. Our team delivers
                cutting-edge results for customers looking for premium
                automotive exterior &amp; interior refinishing services. Our goal is to push the industry standards to
                incorporate effective business SOPs - allowing us to
                provide maximized margins & value of service for
                customers looking for the best of the best. 
                </p>
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
                        <img src={car1} className="d-block w-100" alt="..."></img>
                        <div className="carousel-caption d-none d-md-block">
                            <h5 style={{color:'black'}}>PERFECTION.</h5>
                            <p style={{color:'black'}}>At our company, perfection is not just a goal; it's our standard</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={car2} className="d-block w-100" alt="..."></img>
                        <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={car3} className="d-block w-100" alt="..."></img>
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
            <div className='col-3'>
                <p className='paragraph-noanim instrument-sans'>Our goal is to push the industry standards to
                incorporate effective business SOPs - allowing us to
                provide maximized margins & value of service for
                customers looking for the best of the best.</p>
            </div>
            <div className='col-12 world text-center' style={{marginTop:'10vh'}}>
                <div className='col-3'>
                    <p className='header garmond'><i>500+ Customers</i></p>
                </div>
                <div className='col-3'>
                    <p className='header garmond'><i>10+ Years of Experience</i></p>
                </div>
                <div className='col-3'>
                    <p className='header garmond'><i>Proudly Partnered With BC Suppliers</i></p>
                </div>
            </div>
            <div className='col-12 text-center pb-5' style={{marginTop:'10vh'}}>
                <h1 className='quote header instrument-sans'>WE OFFER A WIDE RANGE OF  <span className='highlight'><i>PREMIUM DETAILING SERVICES.</i></span></h1>
            </div>
            <div className='col-6'>
                <p className='paragraph-noanim instrument-sans' style={{float:'left'}}>Our team of detailing specialists provide over 10+ years of
                experience within the professional-grade production detailing
                industry. All of our CarFax registered & warrantied coating services
                are carried out by certified professional installers with active
                credentials from Nasiol, Labocosmetica, Chemical Guys, and more.
                </p>
                <p className='paragraph-noanim instrument-sans'>The company mission involves helping our customers receive the
                products & results they desire. We develop a customized price
                matrix for all clients to ensure they have the flexibility to opt in to
                any of our products at the best pricing and quality available.
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
                <p className='paragraph instrument-sans fade-right'>Founder and Lead Detailer</p>
                <p className='paragraph instrument-sans fade-right'>Certified Detailing Instructor</p>
            </div>
            <div className='col-3 text-center'>
                <img src={pfp} alt='Koichi Endo' className='pfp' style={{maxWidth:'100%', maxHeight:'auto'}}></img>
                <p className='paragraph instrument-sans fade-right'><i>Matthew Cachero</i></p>
                <p className='paragraph instrument-sans fade-right'>Co-Founder and Detailer</p>
                <p className='paragraph instrument-sans fade-right'>Certified Detailing</p>
            </div>
            <div className='col-12 text-center pb-5' style={{marginTop:'10vh'}}>
                <h1 className='quote header instrument-sans'>WE UTILIZE <span className='highlight'><i>WORLD-CLASS</i></span> PRODUCTS.</h1>
                <img src={nl272} alt='NL272' className='pt-5' style={{maxWidth:'100%', maxHeight:'auto'}}></img>
            </div>
            <div className='col-4 text-center'>
                <p className="paragraph instrument-sans btn-ripple" style={{fontWeight:'500', opacity:'1'}}>"YOU'RE ONE DROP AWAY FROM PERFECTION"<br/><span style={{fontSize:'0.6em', fontWeight:'300'}}>-NASIOL</span></p>
            </div>
        </div>
        <NL272/>
        {/* <DetailGarage/>
        <Labocosmetica/> */}
[]    </div>

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
