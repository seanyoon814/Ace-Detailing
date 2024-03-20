import './Main.css';

import ServicesSection from '../ServicesSection/ServicesSection';
import FAQSection from '../FAQSection/FAQSection';
import ContactsSection from '../ContactsSection/ContactsSection';
import BlogSection from '../BlogSection/BlogSection';
import AboutSection from '../AboutSection/AboutSection';
import Header from '../Header/Header';
import HeaderImage from '../HeaderImage/HeaderImage';
import Footer from '../Footer/Footer';
function Main() {
    return (
        <>
            <div id='hidden'></div>
            <Header/>
            <HeaderImage />
            <AboutSection />
            <ServicesSection />
            <Footer />
        </>
    );
}

export default Main;
