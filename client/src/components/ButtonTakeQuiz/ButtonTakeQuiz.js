import React from "react";
import "./ButtonTakeQuiz.scss";
import Button from "react-bootstrap/Button";

const ButtonTakeQuiz = () => {
    return (
        <Button href="/quiz" className="buttonTakeQuiz">Take the Quiz</Button>
    )
}

export default ButtonTakeQuiz;