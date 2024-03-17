import './Main.css';

import ServicesSection from '../ServicesSection/ServicesSection';
import FAQSection from '../FAQSection/FAQSection';
import ContactsSection from '../ContactsSection/ContactsSection';
import BlogSection from '../BlogSection/BlogSection';
import AboutSection from '../AboutSection/AboutSection';
import Header from '../Header/Header';
import HeaderImage from '../HeaderImage/HeaderImage';
function Main() {
    return (
        <>
            <div id='hidden'></div>
            <Header/>
            <HeaderImage />
            <AboutSection />
            <ServicesSection />
            <footer>
                <div>
                    <h3>Contact Information</h3>
                    <a>Phone Number</a>
                    <a>Email Address</a>
                    <a>Address</a>
                </div>
                <div>
                    <h3>Pages</h3>
                    <a>Home</a>
                    <a>Services</a>
                    <a>Blog</a>
                    <a>FAQs</a>
                    <a>Contact Us</a>
                </div>
            </footer>
        </>
    );
}

export default Main;
