import React from 'react';
import './Footer.css';
function Footer(){
    return(
        <div className="container-fluid mt-5 ftr">
        <footer className="text-center">
            <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4">Contact Ace Detailing</h6>
                    <p><i className="fas fa-home mr-3"></i> Surrey, BC, Canada</p>
                    <p><i className="fas fa-envelope mr-3"></i>acedetailingbc@gmail.com </p>
                    <p><i className="fas fa-phone mr-3"></i>+1 778-683-6543</p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Quick Links</h6>
                    <p><a className="text-white" href="/maps">Maps</a></p>
                    <p><a className="text-white" href="/faq">FAQ</a></p>
                    <p><a className="text-white" href="/user">User Portal</a></p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Affiliated Sites</h6>
                    <p><a className="text-white" href="https://www.detailgaragevancouver.com/" target='_blank'>Detail Garage Vancouver</a></p>
                    <p><a className="text-white" href="https://www.labocosmetica.com/" target='_blank'>Laboscosmetica</a></p>
                    <p><a className="text-white" href="https://www.nasiol.com/" target='_blank'>Nasiol</a></p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                    <a className="btn btn-primary btn-floating m-1" target="_blank" href="https://www.instagram.com/aced_bykwaa/" role="button" style={{backgroundColor:'#310101', borderColor:'red'}}><i className="fab fa-instagram"></i></a>
                    <a className="btn btn-primary btn-floating m-1" target="_blank" href="https://github.com/seanyoon814/Ace-Detailing" role="button" style={{backgroundColor:'#310101', borderColor:'red'}}><i className="fab fa-github"></i></a>
                </div>
                <div className="col-12 text-center p-3" style={{backgroundColor:'#310101'}}>
                © 2024 Copyright:
                <a className="text-white" href="#"> CMPT 372 Spring 2024</a>
            </div>
            </div>

        </footer>
        </div>
    );
}

export default Footer;