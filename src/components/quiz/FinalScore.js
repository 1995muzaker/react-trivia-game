import React from "react";

const FinalScore = ({ triviaData, scoreView }) => {
  return (
    <div>
      <div className="question-div">
        <h1>Your Final Score {scoreView} points.</h1>
        <p>Below are the Correct Answer of all the Question</p>
        <ul>
          {triviaData.map((item, index) => (
            <li key={index}>
              {item.correct_answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinalScore;
