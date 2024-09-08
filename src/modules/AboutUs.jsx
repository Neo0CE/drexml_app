import React from 'react';
import './AboutUs.css'

const AboutUs = () => {

    return (
    <div className="about-us-content">
        <div className='me'>
            
            
            <div className='text-about-me'>
                <section className='head_name_me'>
                    <span>Javier Gómez Rodríguez</span>
                </section>
                <span className='my-text'>
                <p className='short_description'>Hi, I'm Javier, a physicist, coder, and aspiring data scientist.
                   </p>
                <p className='coding-exp'>My coding experience focuses on scientific calculus using matlab and Python, but lately I've 
                    been very invested into improving my skills in front end development, using frameworks like React. I preferably use D3.js as It's the 
                    base to 99% of the figures you see on the internet, It's also the base of this project.
                    I have also a good amount of knowledge in dashboard making, from scratch and using PowerBi. </p>
                    
                <p className='more-of-me'>You can see my <a href="https://www.linkedin.com/in/javier-g%C3%B3mez-rodr%C3%ADguez-3891871a2/"><u>linkedin</u></a> or my <a href="https://github.com/Neo0CE"><u>GitHub</u></a></p>
                </span>
            </div>
            <img className="image-me" src="https://raw.githubusercontent.com/Neo0CE/TIA/main/279733924_2481817281949273_3451369177283475796_n.jpg" 
            alt="Javier Gómez Rodríguez"/>
                
        
        </div>


        </div>

    )
}

export default AboutUs