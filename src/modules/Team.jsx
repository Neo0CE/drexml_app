import React, { useState, useEffect } from 'react';
import './Team.css';

const navigation = [
    { name: 'Carlos Loucera', href: '/' },
    { name: 'Results', href: '/results' },
    { name: 'Team', href: '/team' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Dataset Example', href: '/dataset-example' },
  ];

  function Team() {
    
  
    return (

        <div className="team_content">
            <div className='top-title'><h1>Andalusian Platform for Computational Medicine Team</h1></div>
        <div className="team_container">
       
            <div className='one'>
                <a href="https://www.linkedin.com/in/carlos-loucera-mu%C3%B1ecas-577851147/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=es">
                    <img className="image-people" src="https://www.clinbioinfosspa.es/files/image/miembros/individual/loucera200.jpg" 
                    alt="Carlos Loucera"/>
                    <div>
                        <section className='head_name'>
                        <span>Carlos Loucera</span>
                        <p>PhD in Mathematics and Computation</p>
                    </section>

                    <section>
                        <span className='team_content'>Machine Learning Researcher.</span>
                    </section>
                    </div>
                </a>
            </div>
            <div className='two'>
                <a href="https://www.linkedin.com/in/joaquindopazo/?originalSubdomain=es">
                    <img className="image-people" src="https://www.clinbioinfosspa.es/files/image/miembros/individual/ximo2020.jpeg" 
                    alt="Joaquín Dopazo"/>
                    <div>
                        <section className='head_name'>
                        <span>Joaquín Dopazo</span>
                        <p>Head of Area</p>
                    </section>

                    <section>
                        <span className='team_content'>Also heading the Functional Genomics Node of the INB and the Bioinformatics group of the CIBERER.</span>
                    </section>
                    </div>
                </a>
            </div>
            <div className='three'>
                <a href="https://www.linkedin.com/in/marina-esteban-655046290/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=es">
                    <img className="image-people" src="https://www.clinbioinfosspa.es/files/image/miembros/individual/marina_esteban2.jpg" 
                    alt="Marina Esteban Medina"/>
                    <div>
                        <section className='head_name'>
                        <span>Marina Esteban Medina</span>
                        <p>PhD Student</p>
                    </section>

                    <section>
                        <span className='team_content'>Research in data analysis and molecular mechanisms of rare diseases and cancer.</span>
                    </section>
                    </div>
                </a>
            </div>

            <div className='four'>
                <a href="https://www.linkedin.com/in/victor-m-de-la-oliva-roque-797230152/">
                    <img className="image-people" src="https://media.licdn.com/dms/image/v2/D4D03AQFMblkMrGMjsw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701605346435?e=1730937600&v=beta&t=ge_UiN84jwGOa9p0pIRxA1bm0P5Lg1JQ5bRAqusCdGM" 
                    alt="Víctor Manuel de la Oliva Roque"/>
                    <div>
                        <section className='head_name'>
                        <span>Víctor Manuel de la Oliva Roque</span>
                        <p>Master Student</p>
                    </section>

                    <section>
                        <span className='team_content'>Computational Systems Medicine.</span>
                    </section>
                    </div>
                </a>
            </div>

            <div className='five'>
                <a href="https://www.linkedin.com/in/sarahrzgl/?originalSubdomain=es">
                    <img className="image-people" src="https://media.licdn.com/dms/image/v2/D4D03AQGVQesSXH9jXg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674049345317?e=1730937600&v=beta&t=GtIqmJ8GHce0IfqLMzGXLMOLTxZurRTxkHwu6fPLy1s" 
                    alt="Sara Herráiz-Gil"/>
                    <div>
                        <section className='head_name'>
                        <span>Sara Herráiz-Gil</span>
                        <p>Master Student</p>
                    </section>

                    <section>
                        <span className='team_content'>Bioinformatician | Data Scientist.</span>
                    </section>
                    </div>
                </a>
            </div>

            <div className='six'>
                <a href="https://www.linkedin.com/in/mpena-chilet/?originalSubdomain=es">
                    <img className="image-people" src="https://media.licdn.com/dms/image/v2/C4D03AQEyKw1H4IbBAw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517286760262?e=1730937600&v=beta&t=4Hny3QzHKGw1HailtT7PvoCe_o0T_55aTP1Jwryseh4" 
                    alt="María Peña-Chilet"/>
                    <div>
                        <section className='head_name'>
                        <span>María Peña-Chilet</span>
                        <p>PhD in Biomedicine</p>
                    </section>

                    <section>
                        <span className='team_content'>Senior Bioinformatician.</span>
                    </section>
                    </div>
                </a>
            </div>
    </div>
    
            <div className='more_about_us'>
            <h2>About Us</h2>
            <p>The Andalusian Platform for Computational Medicine one of the research platforms 
                of the Fundación Progreso y Salud (FPS), has been conceived as a fundamental piece of 
                the Personalized Medicine plan of the Andalusian community, with the mission of facilitating 
                and providing the tools for the inclusion of the genomic data of the patient in the electronical 
                health record.
            </p>
            <p>
                This Area has the dual aim of developing innovative algorithms and methods for the analysis of genomic data of 
                patients, combined with the production of high quality software specifically designed to be used by clinician end users, 
                all this with a strong translational orientation. The ultimate objective of the Area is to bring to the clinician complex 
                algorithms for the management of complex genomics data in a transparent way for them, which ultimately foster the adoption 
                of innovative technologies in the current clinical practice.
            </p>
            <span>
            <p>If you want to know more about us you can visit our official web page:</p>
            <a href="https://www.clinbioinfosspa.es/">https://www.clinbioinfosspa.es/</a>
            </span>
            </div>
    </div>
)}

export default Team