import './FAQSection.css';

import aceDetailing from '../../constants/aceDetailing';
import Collapsible from 'react-collapsible';
import * as React from 'react';
import Slide from '@mui/material/Slide';
function FAQSection() {
    const [isView, setView] = React.useState(false);
    const handleChange = () => {
        setView((prev) => !prev);
    };

    React.useEffect(() => {
        // const heading = document.getElementById('faq-container')?.scrollIntoView({behavior: 'smooth'})
        function checkInView(){
            // Get the bounding rectangle of the heading
            const heading = document.getElementById('faq-container');
            const blog = document.getElementById('blog');
            const {top} = heading!.getBoundingClientRect();
            const {bottom} = blog!.getBoundingClientRect();
            // console.log("top of heading:" + top + "\nbottom of blog:"+ bottom);

            if( top > -200 && bottom < top/3 ){
                return true;
            }else {
                return false;
            }
        }
        document.addEventListener('scroll', function(){    
            if(checkInView()){
                setView(true);
            }else{
                setView(false);
            }
        });
        }, []);
    
    return (
        <div id="faq-container">
        <section id="faq-list" className="lato-light ">
                <Slide direction="right" in={isView} mountOnEnter unmountOnExit>
            <div id="faq-heading">
                    <h1 className="display-3 lato-light">Frequently Asked Questions!</h1>
            </div>
                </Slide>
                {
                    aceDetailing.questions.map(item => 
                        <Collapsible
                            trigger={item.question}
                            key={item.question}
                        >
                            {item.answer}
                        </Collapsible>    
                    )
                }
            
        </section>
        </div>
    );
}

export default FAQSection;
