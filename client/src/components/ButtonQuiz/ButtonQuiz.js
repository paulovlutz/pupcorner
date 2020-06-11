import React from "react";
import "./ButtonQuiz.scss";
import Button from "react-bootstrap/Button";

const QuizButton = (props) => {
    return (
        <Button href="/quiz" className="button">{props.text}</Button>
    )
}

export default QuizButton;