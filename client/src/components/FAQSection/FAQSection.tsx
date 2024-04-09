import './FAQSection.css';
import Header from '../Header/Header';
import aceDetailing from '../../constants/aceDetailing';
import * as React from 'react';
import IconButton from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from '../../images/car_1.jpg';
import Image2 from '../../images/car_2.jpg';
import Image3 from '../../images/car_3.jpg';
import Image4 from '../../images/IMG_4889.png';
import Image5 from '../../images/IMG_4862.png';
import { useEffect,useState } from 'react';
function FAQSection() {
    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState(true);
    const images = [
        Image,
        Image2,
        Image3,
        Image4,
        Image5
    ]
    const handleChangeFor = () => {
        console.log("f",index)
        setIndex((index + 1) % aceDetailing.questions.length)
    };
    const handleChangeBack = () => {
        console.log("b",index)
        setIndex(prevIndex => {
        if(prevIndex <= 0){
            prevIndex = aceDetailing.questions.length - 1
        } else{
            prevIndex = (prevIndex - 1) % aceDetailing.questions.length
        }
        return prevIndex;
        })
    };

    useEffect(() => {
        // setSlide(false);
        // setTimeout(() => {
        //     setSlide(true);
        // }, 100);
    },[])
    return (
        <div id="faq-container">
            <div id='hidden'></div>
            <div id="faq-content" >
                <Header/>
                <div id="faq-section">
                    <div id="faq-heading">
                        <div id="question">
                            <Slide direction="right" in={slide} mountOnEnter unmountOnExit>  
                                <h2>{aceDetailing.questions[index].question}</h2>
                            </Slide>
                        </div>
                    </div>
                    <div id="faq-answer">
                        <ul>
                        {
                        aceDetailing.questions[index].answer.split("\n").length !== 1 ?
                            aceDetailing.questions[index].answer.split("\n").map((item, key) => (<li key={key}> {item.trim()}</li>)) :
                        <p>{aceDetailing.questions[index].answer}</p>
                        }
                        </ul>
                    </div>
                    <div id='icon-container'>
                            <IconButton id='icon' onClick={handleChangeBack}>
                                <ArrowBackIosIcon/>
                            </IconButton>
                            <IconButton id='icon' onClick={handleChangeFor}>
                                <ArrowForwardIosIcon/>
                            </IconButton>
                        </div>
                </div>
                <div id="faq-imagecontainer">
                    <img id="faq-image" src={images[index]} alt={`Car Image ${index}`}  />
                </div>
            </div> 
        </div>
    );
}

export default FAQSection;
