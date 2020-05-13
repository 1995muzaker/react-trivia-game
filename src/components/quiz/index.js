import React from "react";

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    quizData: [],
  };

  loadQuizData = () => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.results) {
          let valueThree =
            data.results[this.state.currentQuestion].incorrect_answers;
          let newValue = valueThree.concat(
            data.results[this.state.currentQuestion].correct_answer
          );
          console.log(newValue);
          this.setState(() => {
            return {
              quizData: data.results,
              questions: data.results[this.state.currentQuestion].question,
              answer: data.results[this.state.currentQuestion].correct_answer,
              options: newValue,
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.results) {
          let valueThree =
            data.results[this.state.currentQuestion].incorrect_answers;
          let newValue = valueThree.concat(
            data.results[this.state.currentQuestion].correct_answer
          );
          console.log(newValue);
          if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
              return {
                quizData: data.results,

                disabled: true,
                questions: data.results[this.state.currentQuestion].question,
                answer: data.results[this.state.currentQuestion].correct_answer,
                options: newValue,
              };
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //check answer
  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === this.state.quizData.length - 1) {
      this.setState({
        isEnd: true,
      });
    }
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd, quizData } = this.state;
    console.log(options);
    if (isEnd) {
      return (
        <div className="result">
          <h3>Game Over your Final score is {this.state.score} points </h3>
          <p>
            The correct answer's for the questions was
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.correct_answer}
                </li>
              ))}
            </ul>
          </p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>{this.state.questions} </h1>
          <span>{`Questions ${currentQuestion}  out of ${
            quizData.length - 1
          } remaining `}</span>
          {options.map((option) => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default Quiz;
