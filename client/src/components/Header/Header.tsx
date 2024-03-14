import './Header.css';
import testImage from './test-img.png';
function Header() {
    return (
        <header className="navbar navbar-nav" id='main-navbar'>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-12 text-center'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item lato-light">
                                <li id="logo"><img src={testImage} style={{maxWidth: '5vw', maxHeight: 'auto'}}></img></li>
                                <a className="nav-link" href="#">HOME</a>
                            </li>
                            <li className="nav-item lato-light">
                                <a className="nav-link" href="#">FAQs</a>
                            </li>
                            <li className="nav-item lato-light">
                                <a className="nav-link" href="#">BLOG</a>
                            </li>
                            <li className="nav-item lato-light">
                                <a className="nav-link" href="#">OUR SERVICES</a>
                            </li>
                            <li className="nav-item lato-light">
                                <a className="nav-link" href="#">USER PORTAL</a>
                            </li>
                            <li className="nav-item lato-light">
                                <a className="nav-link" href="#">CONTACT US</a>
                            </li>
                            <li className="nav-item lato-light">
                                <div id="header-sidebar-toggle">
                                    <li className='header-sidebar-title lato-light'>Ace Detailing</li>
                                    <li className='header-sidebar-subtitle lato-light'>✉ acedetailing@gmail.com</li>
                                    <li className='header-sidebar-subtitle lato-light'>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;☏ 778-683-6543</li>
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
