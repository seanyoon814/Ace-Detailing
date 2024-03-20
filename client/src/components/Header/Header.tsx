import './Header.css';
import logo from '../../images/logo.png';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function Header() {
    return (
        <header className="navbar navbar-nav" id='main-navbar'>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-12 text-center'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item instrument-sans" id="logo">
                                <li id="logo"><img src={logo} className="logo-img"></img></li>
                            </li>
                            <li className="nav-item instrument-sans">
                                <a className="nav-link" href="/">HOME</a>
                            </li>
                            <li className="nav-item instrument-sans">
                                <a className="nav-link" href="#">FAQs</a>
                            </li>
                            <li className="nav-item instrument-sans">
                                <a className="nav-link" href="#">BLOG</a>
                            </li>
                            <li className="nav-item instrument-sans">
                                <a className="nav-link" href="/maps">MAPS</a>
                            </li>
                            <li className="nav-item instrument-sans">
                                <a className="nav-link" href="/user">USER PORTAL</a>
                            </li>
                            <li className="nav-item instrument-sans">
                                <a className="nav-link" href="#">CONTACT US</a>
                            </li>
                            <li className="nav-item instrument-sans">
                                <div id="header-sidebar-toggle">
                                    {/* <li className='header-sidebar-title instrument-sans'>Ace Detailing</li>
                                    <li className='header-sidebar-subtitle instrument-sans'>✉ acedetailing@gmail.com</li>
                                    <li className='header-sidebar-subtitle instrument-sans mb-3'>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;☏ 778-683-6543</li> */}
                                </div>
                                <input className="mt-3"type="text" name="query" placeholder="Search..."></input>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
