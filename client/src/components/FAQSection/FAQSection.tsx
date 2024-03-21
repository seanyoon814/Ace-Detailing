import './FAQSection.css';
import Header from '../Header/Header';
import aceDetailing from '../../constants/aceDetailing';
import * as React from 'react';
import IconButton from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from '../../images/car_1.jpg';
import Image2 from '../../images/car_2.jpg';
import Image3 from '../../images/car_3.jpg';
import Image4 from '../../images/logo.png';
import Image5 from '../../images/pfp.png';
function FAQSection() {
    const [index, setIndex] = React.useState(0);
    const [slide, setSlide] = React.useState(true);
    const images = [
        Image,
        Image2,
        Image3,
        Image4,
        Image5
    ]
    const handleChange = () => {
        setSlide(false);
        setIndex(prevIndex => (prevIndex + 1) % aceDetailing.questions.length)
        setTimeout(() => {
            setSlide(true);
        }, 100);
    };


    return (
        <div id="faq-container">
            <div id="faq-content" >
            <Header/>
                <div id="faq-section">
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                    <Slide direction="right" in={slide} mountOnEnter unmountOnExit>  
                        <h3>{aceDetailing.questions[index].question}</h3>
                    </Slide>
                        <IconButton id='' onClick={handleChange}>
                            <ArrowForwardIosIcon/>
                        </IconButton>
                    </div>
                    <p>{aceDetailing.questions[index].answer}</p>
                </div>
                <div id="faq-imagecontainer">
                    <img id="faq-image" src={images[index]} alt={`Car Image ${index}`}  />
                </div>
            </div> 
        </div>
    );
}

export default FAQSection;
