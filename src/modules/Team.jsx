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
                    <img className="image-people" src="https://media.licdn.com/dms/image/D4D03AQFMblkMrGMjsw/profile-displayphoto-shrink_400_400/0/1701605346435?e=1723075200&v=beta&t=1vhMxf72xYM9kHkYul6anx61Qa-u7BTWj5lHHl_fIvc" 
                    alt="Víctor Manuel de la Oliva Roque"/>
                    <div>
                        <section className='head_name'>
                        <span>Víctor Manuel de la Oliva Roque</span>
                        <p>Master Student</p>
                    </section>

                    <section>
                        <span className='team_content'>Medicina Computacional de Sistemas.</span>
                    </section>
                    </div>
                </a>
            </div>

            <div className='five'>
                <a href="https://www.linkedin.com/in/sarahrzgl/?originalSubdomain=es">
                    <img className="image-people" src="https://scontent-mad1-1.xx.fbcdn.net/v/t1.18169-1/20597134_828256464004301_4214403012124704027_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Dd-vGuhol48Q7kNvgE6c8qS&_nc_ht=scontent-mad1-1.xx&oh=00_AYALlte9RULuQjAbo87jvDCsDQOMJRJHQUyXbbhRnmpSrg&oe=6686AA97" 
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
                    <img className="image-people" src="https://media.licdn.com/dms/image/C4D03AQEyKw1H4IbBAw/profile-displayphoto-shrink_800_800/0/1517286760262?e=1723075200&v=beta&t=mkKiRaEY08mzhY5m1NEpiaGsthAMjFsomq4ykWTXasI" 
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

            <div className='seven'>
                <a href="https://www.linkedin.com/in/javier-g%C3%B3mez-rodr%C3%ADguez-3891871a2/">
                    <img className="image-people" src="https://media.licdn.com/dms/image/C5603AQHrgJtU4NZnmQ/profile-displayphoto-shrink_200_200/0/1625054856018?e=2147483647&v=beta&t=rDRaSgRJ2ErwD0dpJKR-R8YWeFJdpULlz7pmugRz-Mg" 
                    alt="Javier Gómez Rodríguez"/>
                    <div>
                        <section className='head_name'>
                        <span>Javier Gómez Rodríguez</span>
                        <p>Master Student</p>
                    </section>

                    <section>
                        <span className='team_content'>Physicist | Data Scientist.</span>
                    </section>
                    </div>
                </a>
            </div>

           
        
    </div>
    

)}

export default Team