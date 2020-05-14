import React from "react";
import "../../styles/quiz.scss";

const Questions = ({
  questions,
  currentQuestion,
  triviaData,
  optionsList,
  selectedAnswer,
  disabled,
  nextQuestionView,
  finishData,
  checkData,
}) => {
  return (
    <div className="question-div">
      <h3>{`Round ${currentQuestion} / ${triviaData.length - 1}`}</h3>
      <h1>{questions} </h1>
      <ul>
        {optionsList.map((option) => (
          <li
            key={option}
            className={selectedAnswer === option ? "selected-answer" : null}
            onClick={() => checkData(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      {currentQuestion < triviaData.length - 1 && (
        <button className="" disabled={disabled} onClick={nextQuestionView}>
          Next
        </button>
      )}
      {/* //adding a finish button */}
      {currentQuestion === triviaData.length - 1 && (
        <button onClick={finishData}>Finish</button>
      )}
    </div>
  );
};

export default Questions;
