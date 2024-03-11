import './Main.css';

import ServicesSection from '../ServicesSection/ServicesSection';
import FAQSection from '../FAQSection/FAQSection';
import ContactsSection from '../ContactsSection/ContactsSection';
import BlogSection from '../BlogSection/BlogSection';
import AboutSection from '../AboutSection/AboutSection';

function Main() {
    return (
        <>
            <header>
                <h1>Ace Detailing</h1>
            </header>
            
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
