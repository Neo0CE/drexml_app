import React from 'react';
import './Home.css';

function Home () {

return (
    <div className='home_content'>
        <div className='welcome_top'>
            <h1>dreXml 1.1.0 available:</h1>
            <p>Check it out <a className="here" href="https://github.com/loucerac/drexml/tree/master">Here</a>.</p>
        </div>

        <div className="home_info">
            <h1>What is dreXml?</h1>
            <p className='description'>dreXml englobes a command line tool and a Python package for rational data-driven drug repurposing. The
                package employs machine learning and mechanistic signal transduction modeling to identify drug targets capable
                of regulating a particular disease. In addition, it employs explainability tools to contextualize potential drug
                targets within the functional landscape of the disease. The methodology is validated in Fanconi Anemia and
                Familial Melanoma, two distinct rare diseases where there is a pressing need for solutions. In the Fanconi Anemia
                case, the model successfully predicts previously validated repurposed drugs, while in the Familial Melanoma case,
                it identifies a promising set of drugs for further investigation.</p>
            <div className="img-container">
                <img src="https://loucerac.github.io/drexml/_images/holird.png" alt="home-pic" />
            </div>
            <h1>What does this Web App offer?</h1>
            <p className='sell_sentence'>A <u>free</u>, <u>intuitive</u> and <u>OpenSource</u> solution for displaying the obtained results by the drexml software.
                <br/>
            </p>

            <p className='explanation'>You will be able to see results produced by the software in our <u>Results</u> component, based on two 
                points of view: Drug view and Target view. They will be presented in the shape 
                of heatmaps, with the corresponding barcharts, for drugs or genes (depending on the view selected), and circuits next to them.
                <br></br>
                We also proporcionate a zoom feature, where you can see the results in a higher definition and readable way, followd by a tooltip, on heatmaps and 
                barcharts, in case you need to see the values with more detail.
            </p>
            <p>
                You will also be able to navigate deeper through the data in our <u>Dataset Example</u> component, where you can analyse, filter and download
                the data used by the software.
            </p>
            <h2 className='results'><u>Results</u></h2>
            <div className="pointsofview">
                <div className="drugviewPO">
            <h3><u>Drug view:</u></h3>
            <p> You will see the heatmap with the emphasis made on the drugs used for the repurposing profile.</p>
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/heatmap_drug.png" alt="heatmap_drug" className="example" />
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/zoom_drug.png" alt="zoom_drug" className="example" />
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/barchart_drug.png" alt="barchart_drug" className="example" />
                </div>

                <div className="targetviewPO">
            <h3><u>Target view:</u></h3>
            <p> You will see the heatmap with the emphasis made on the target genes used for the repurposing profile.</p>
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/heatmap_target.png" alt="heatmap_target" className="example" />
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/zoom_target.png" alt="zoom_target" className="example" />
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/barchart_target.png" alt="barchart_target" className="example" />
                </div>
            </div>

            <h2 className='results'><u>Dataset Example</u></h2>
                <div className='dataset_example_home'>
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/dataset_example.png" alt="dataset_example" className="example_two" />
            <img src="https://raw.githubusercontent.com/Neo0CE/TIA/main/select_example_2.png" alt="selection_example" className="example_two" />
                </div>
            
            </div>

        


        

       
    </div>

)}

export default Home