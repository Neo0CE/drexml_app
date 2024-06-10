import React from 'react';
import './AboutUs.css'

const AboutUs = () => {

    return (
    <div className="about-us-content">
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

    )
}

export default AboutUs