import React from "react";
import './About.scss';
import Header from '../../components/Header/Header';
import AnimatedSquareBackground from '../../components/AnimatedSquareBackground/AnimatedSquareBackground';

function getYear() {
    return new Date().getFullYear();
}

const About = () => {
    return (
        <>
            <Header />
            <section className="about animated-background">
                <div className="about__text">
                    <h1 className="about__text-title">Pupcorner</h1>
                    <p className="about__text-slogan">Helping you find the pawfect friend in this pupcorner of the world!</p>
                    <p className="about__text-description">This Web Application was created as my Capstone Project in the Web Development Program (Spring Cohort 2020) at <a className="about__text-brainstation" href="https://brainstation.io/" target="_blank" rel="noopener noreferrer">BrainStation</a>.</p>
                    <p className="about__text-contact">If you would like to know a little more about the project, feel free to contact me. I would love to answer any of your questions.</p>
                    <p><a className="about__text-linkedin" href="https://www.linkedin.com/in/paulo-vinicius-lutz/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> linkedin.com/in/paulo-vinicius-lutz/</a></p>
                </div>
                <AnimatedSquareBackground />
            </section>
            <footer className="about__footer">Created by Paulo Lutz <i className="fas fa-paw about__text-icon"></i> {getYear()}</footer>
        </>
    )
};

export default About;