import './Main.css';

import ServicesSection from '../ServicesSection/ServicesSection';
import FAQSection from '../FAQSection/FAQSection';
import ContactsSection from '../ContactsSection/ContactsSection';
import BlogSection from '../BlogSection/BlogSection';
import AboutSection from '../AboutSection/AboutSection';
import Header from '../Header/Header';
function Main() {
    return (
        <>
            <Header/>
            <div id="hidden"></div>
            <div className='container-fluid image-section d-flex justify-content-center align-items-center'>
                <div className='row'>
                    <h1 className='col-12 text-center title lato-light'>ACE DETAILING</h1>
                    <h2 className='col-12 mt-3 text-center subtitle lato-light'>CREATING CHARACTER THROUGH PASSION AND VISUALS.</h2>
                </div>
            </div>
            <AboutSection />
            <ServicesSection />
            <BlogSection />
            <FAQSection />
            <ContactsSection />

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
