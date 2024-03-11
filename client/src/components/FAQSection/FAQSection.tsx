import './FAQSection.css';

import aceDetailing from '../../constants/aceDetailing';
import Collapsible from 'react-collapsible';

function FAQSection() {
    return (
        <section>
            <h1>Frequently Asked Questions</h1>
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
    );
}

export default FAQSection;
