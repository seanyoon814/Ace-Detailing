import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ExteriorServices.css"
import video from "../../videos/exterior-detailing.mov"
import car1 from '../../images/car_1.jpg';
import car2 from '../../images/car_2.jpg';
import car3 from '../../images/car_3.jpg';
function ExteriorServices()
{
    return(
        <>
            <Header/>
            <div id="hidden"></div>
            <div className="container-fluid">
                <div className="row justify-content-center" style={{marginTop:'25vh'}}>
                    <div className="col-4 text-center">
                        <video className="video" autoPlay loop muted>
                            <source src={video}></source>
                        </video>
                    </div>
                    <div className="col-7">
                        <h1 className="header lato-light text-center">EXTERIOR SERVICES</h1>
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner mt-5">
                    <div className="carousel-item active">
                        <img src={car1} style={{filter:'brightness(40%)'}}className="d-block w-100 img-rounded" alt="..."></img>
                        <div className="carousel-caption d-none d-md-block" style={{transform:'translateY(-100px)'}}>
                        <h1 className="header garmond" style={{fontSize:'2.5em'}}>The Standard Exterior Detail Package</h1>
                                <h1 className="header lato-light" style={{fontSize:'1.2em'}}>$80 Coupe | $90 Sedan | $110 Small SUV/Truck | $130+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1.2em'}}>
                                    <li><i>Multi-stage foam hand-wash using pH-balanced soaps</i></li>
                                    <li><i>Degrease & wash engine bay to remove dirt, oil, & other etching</i></li>
                                    <li><i>Pressure wash wheel wells & brush fender liners</i></li>
                                    <li><i>Rim & tire cleaning with high-gloss synthetic protectant application</i></li>
                                    <li><i>Alkaline degreaser application on whole exterior, door jambs, & trunk jambs</i></li>
                                    <li><i>Synthetic wax application, providing up to 3 months of UV & chemical protection</i></li>
                                </ul>
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
                        <div className="row mt-5" style={{borderTop:'1px solid white', borderBottom:'1px solid white'}}>
                            <div className="col-12 mt-5 mb-5">
                                <h1 className="header garmond" style={{fontSize:'3em'}}>The Standard Exterior Detail Package</h1>
                                <h1 className="header lato-light" style={{fontSize:'1.5em'}}>$80 Coupe | $90 Sedan | $110 Small SUV/Truck | $130+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left'}}>
                                    <li><i>Multi-stage foam hand-wash using pH-balanced soaps</i></li>
                                    <li><i>Degrease & wash engine bay to remove dirt, oil, & other etching</i></li>
                                    <li><i>Pressure wash wheel wells & brush fender liners</i></li>
                                    <li><i>Rim & tire cleaning with high-gloss synthetic protectant application</i></li>
                                    <li><i>Alkaline degreaser application on whole exterior, door jambs, & trunk jambs</i></li>
                                    <li><i>Synthetic wax application, providing up to 3 months of UV & chemical protection</i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row" style={{borderBottom:'1px solid white'}}>
                            <div className="col-12 mt-5 mb-5">
                                <h1 className="header garmond" style={{fontSize:'3em'}}>The Complete Exterior Detail Package</h1>
                                <h1 className="header lato-light" style={{fontSize:'1.5em'}}>$280 Coupe | $300 Sedan | $320 Small SUV/Truck | $340+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left'}}>
                                    <li><i>Advanced multi-stage foam wash using pH-balanced soaps & required surfactants</i></li>
                                    <li><i>Pressure wash & fine-brush detailing on wheel spokes, barrel, & wells</i></li>
                                    <li><i>Complete rim & tire detail with ceramic-based coating application</i></li>
                                    <li><i>Clay bar treatment to remove etched & embedded contaminants (bug splatter, road
tar, iron fallout, sap)</i></li>
                                    <li><i>Complete one-stage DA (hologram-free) machine polish</i></li>
                                    <li><i>Synthetic wax application, providing up to 3 months of UV & chemical protection</i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row" style={{borderBottom:'1px solid white'}}>
                            <div className="col-12 mt-5 mb-5">
                                <h1 className="header garmond" style={{fontSize:'3em'}}>Optional Exterior Add-ons</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left'}}>
                                    <li><i>6 Month Ceramic Paint Sealant Upgrade - <b>$100</b></i></li>
                                    <li><i>Windshield Rain Repellant Coating - $60</i></li>
                                    <li><i>Headlight Restoration - $100</i></li>
                                    <li><i>Additional Paint Correction Rate - $90/hr</i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ExteriorServices;