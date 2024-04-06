import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ExteriorServices.css"
import exterior from "../../videos/exterior-detailing.mov"
import interior from "../../videos/interior-detailing.mov"
import ceramic from "../../videos/ceramic-coating.mp4"
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
                    <div className="col-12 text-center">
                        <h1 className="header garmond">OUR SERVICES</h1>
                        <p className="paragraph-noanim instrument-sans">Our team of detailers provide a range of professional automotive reconditioning services including basic exterior & interior detailing packages, to complete multi-stage paint correction or interior refinishing services.</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12 hoverable">
                        <video className="video" autoPlay loop muted>
                            <source src={exterior}></source>
                        </video>
                        <div className="overlay-text text-center header garmond">
                            EXTERIOR SERVICES
                        </div>
                        <div className="information-section">
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>The Standard Exterior Detail Package</h1>
                                <h1 className="header lato-light" style={{fontSize:'1em'}}>$80 Coupe | $90 Sedan | $110 Small SUV/Truck | $130+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>Multi-stage foam hand-wash using pH-balanced soaps</i></li>
                                    <li><i>Degrease & wash engine bay to remove dirt, oil, & other etching</i></li>
                                    <li><i>Pressure wash wheel wells & brush fender liners</i></li>
                                    <li><i>Rim & tire cleaning with high-gloss synthetic protectant application</i></li>
                                    <li><i>Alkaline degreaser application on whole exterior, door jambs, & trunk jambs</i></li>
                                    <li><i>Synthetic wax application, providing up to 3 months of UV & chemical protection</i></li>
                                </ul>
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>The Complete Exterior Detail Package</h1>
                                <h1 className="header lato-light" style={{fontSize:'1em'}}>$280 Coupe | $300 Sedan | $320 Small SUV/Truck | $340+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>Advanced multi-stage foam wash using pH-balanced soaps & required surfactants</i></li>
                                    <li><i>Pressure wash & fine-brush detailing on wheel spokes, barrel, & wells</i></li>
                                    <li><i>Complete rim & tire detail with ceramic-based coating application</i></li>
                                    <li><i>Clay bar treatment to remove etched & embedded contaminants (bug splatter, road tar, iron fallout, sap)</i></li>
                                    <li><i>Complete one-stage DA (hologram-free) machine polish</i></li>
                                    <li><i>Synthetic wax application, providing up to 3 months of UV & chemical protection</i></li>
                                </ul>
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>Optional Exterior Add-ons</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>6 Month Ceramic Paint Sealant Upgrade - <b>$100</b></i></li>
                                    <li><i>Windshield Rain Repellant Coating - $60</i></li>
                                    <li><i>Headlight Restoration - $100</i></li>
                                    <li><i>Additional Paint Correction Rate - $90/hr</i></li>
                                </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 hoverable">
                        <video className="video" autoPlay loop muted>
                            <source src={interior}></source>
                        </video>
                        <div className="overlay-text text-center header garmond">
                            INTERIOR SERVICES
                        </div>
                        <div className="information-section">
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>The Complete Interior Detail Package</h1>
                                <h1 className="header lato-light" style={{fontSize:'1em'}}>$120 Coupe | $150 Sedan | $180 Small SUV/Truck | $200+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>Full interior vacuuming of carpet, seats, & trunk</i></li>
                                    <li><i>Floor mats washed, extracted, & protected with synthetic protectant</i></li>
                                    <li><i>Compressed air blowout through seats, air vents, interior dashboard, & all other crevices</i></li>
                                    <li><i>Streak-free window & mirror cleaning</i></li>
                                    <li><i>Disinfect all interior surfaces with alkaline & pH-balanced chemicals</i></li>
                                    <li><i>Leather, alcantara, & suede surfaces detailed & protected</i></li>
                                </ul>
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>Optional Interior Add-ons</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>6-12 Month Ceramic Interior Protection Package (includes all plastic, vinyl, leather, alcantara, suede, & fabric surfaces) - $200</i></li>
                                    <li><i>Seat Shampoo with Extraction $80-$100 per seat</i></li>
                                    <li><i>Ozone or Chlorine Dioxide odour removal treatment $100</i></li>
                                    <li><i>Interior Steam Treatment - $60/hr</i></li>
                                    <li><i>Pet Hair Removal - $60/hr</i></li>
                                    <li><i>1-Channel Dashcam Installation - $80</i></li>
                                    <li><i>2-Channel Dashcam Installation - $160</i></li>
                                </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 hoverable">
                        <video className="video" autoPlay loop muted>
                            <source src={ceramic}></source>
                        </video>
                        <div className="overlay-text text-center header garmond">
                            INTERIOR SERVICES
                        </div>
                        <div className="information-section">
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>The Correction Polish with 1-5 Year Exterior Protection Warranty Optionse</h1>
                                <h1 className="header lato-light" style={{fontSize:'1em'}}>$750+ Coupe | $850+ Sedan | $1000+ Small SUV/Truck | $1100+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>Complete paint surface preparation & decontamination process with thorough clay reconditioning treatment</i></li>
                                    <li><i>Complete 1-stage paint refinishing process providing up to 50%-70% of surface defect removal on damaged paint</i></li>
                                    <li><i>Ceramic Coating application on all paint corrected surfaces, providing exterior protection with warranty up to 5 years</i></li>
                                </ul>
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>The Refinishing Cut with 5-10 Year Exterior Protection Warranty Options</h1>
                                <h1 className="header lato-light" style={{fontSize:'1em'}}>$900+ Coupe | $1100+ Sedan | $1300+ Small SUV/Truck | $1500+ Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>Complete paint surface preparation & decontamination process with thorough clay reconditioning treatment</i></li>
                                    <li><i>Complete 2-stage paint refinishing process providing up to 70%-100% of surface defect removal on damaged paint</i></li>
                                    <li><i>Ceramic Coating application on all paint corrected surfaces, providing exterior protection with warranty up to 10 years</i></li>
                                </ul>
                                <h1 className="header garmond" style={{fontSize:'1.2em'}}>The Ace Experience with Lifetime Exterior Protection Warranty</h1>
                                <h1 className="header lato-light" style={{fontSize:'1em'}}>$1800 Coupe | $2100 Sedan | $2400 Small SUV/Truck | $2800 Large Vehicles</h1>
                                <ul className="paragraph-noanim instrument-sans mt-3" style={{float:'left', fontSize:'1em'}}>
                                    <li><i>Complete usage of advanced paint correction techniques including wet-sanding to refinish all painted surfaces to perfection - pushing above & beyond the factory finish standard.</i></li>
                                    <li><i>Multi-stage paint refinishing process providing up to 90%-100% of surface defect removal on damaged paint</i></li>
                                    <li><i>Ceramic Coating application providing exterior protection warranty for the full lifetime of your registered VIN, as part of the Ace Experience.</i></li>
                                </ul>
                        </div>
                    </div>

                    {/* <div className="col-7">
                        <h1 className="header lato-light text-center">EXTERIOR SERVICES</h1>
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
                    </div> */}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ExteriorServices;