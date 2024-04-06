import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ExteriorServices.css"
import video from "../../videos/exterior-detailing.mov"
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
                    <div className="col-8 text-center">
                        <h1>tststasdtasld</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ExteriorServices;