import React from 'react';
import './Home.css';

function Home () {

return (
    <div className='home_content'>
        <div className='welcome_top'>
            <h1>dreXml 1.0 available:</h1>
            <p>Check it out <a className="here" href="https://github.com/loucerac/drexml/tree/master">Here</a>.</p>
        </div>

        <div className="home_info">
            <h1>What is dreXml?</h1>
            <p>dreXml englobes a command line tool and Python package for rational data-driven drug repurposing. The
                package employs machine learning and mechanistic signal transduction modeling to identify drug targets capable
                of regulating a particular disease. In addition, it employs explainability tools to contextualize potential drug
                targets within the functional landscape of the disease. The methodology is validated in Fanconi Anemia and
                Familial Melanoma, two distinct rare diseases where there is a pressing need for solutions. In the Fanconi Anemia
                case, the model successfully predicts previously validated repurposed drugs, while in the Familial Melanoma case,
                it identifies a promising set of drugs for further investigation.</p>


        </div>

       
    </div>

)}

export default Home