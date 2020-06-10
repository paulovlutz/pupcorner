import React from "react";
import './ButtonRetakeQuiz.scss';
import Button from 'react-bootstrap/Button'

const ButtonRetakeQuiz = () => {
    return (
        <Button href="/quiz" className="buttonRetakeQuiz">Retake the Quiz</Button>
    )
}

export default ButtonRetakeQuiz;