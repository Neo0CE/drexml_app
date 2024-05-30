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
        <ul className='member_list'>
            <li>
                <a href="https://www.clinbioinfosspa.es/files/image/miembros/individual/loucera200.jpg">
                    <img className="image-people" src="https://www.clinbioinfosspa.es/files/image/miembros/individual/loucera200.jpg" alt="Carlos Loucera"/>
                    <div>
                        <section className='head_name'>
                        <span>Carlos Loucera</span>
                        <p>PhD in Mathematics and Computation</p>
                    </section>

                    <section>
                        <span className='content'>Machine Learning Researcher.</span>
                    </section>
                    </div>
                </a>
            </li>
            <li>
                <a href="https://www.clinbioinfosspa.es/files/image/miembros/individual/ximo2020.jpeg">
                    <img className="image-people" src="https://www.clinbioinfosspa.es/files/image/miembros/individual/ximo2020.jpeg" alt="Joaquín Dopazo"/>
                    <section>
                        <span>Joaquín Dopazo</span>
                    </section>
                </a>
            </li>
            <li>
                <a href="https://www.clinbioinfosspa.es/files/image/miembros/individual/marina_esteban2.jpg">
                    <img className="image-people" src="https://www.clinbioinfosspa.es/files/image/miembros/individual/marina_esteban2.jpg" alt="Marina Esteban Medina"/>
                    <section>
                        <span>Marina Esteban Medina</span>
                    </section>
                </a>
            </li>
        </ul>
    </div>
    

)}

export default Team