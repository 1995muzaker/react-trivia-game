import React from "react";
import FinalScore from "./FinalScore";
import Questions from "./Questions";
import LoaderGif from "../../loader.gif";

class Quiz extends React.Component {
  state = {
    currentQuestion: 1,
    selectedAnswer: null,
    optionsList: [],
    scoreView: 0,
    disabled: true,
    completedAnswer: false,
    triviaData: [],
    loading: true,
  };

  loadData = () => {
    this.setState({ loading: true }, () => {
      fetch(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data && data.results) {
            let valueThree =
              data.results[this.state.currentQuestion].incorrect_answers;
            let newValue = valueThree.concat(
              data.results[this.state.currentQuestion].correct_answer
            );
            this.setState(() => {
              return {
                triviaData: data.results,
                questions: data.results[this.state.currentQuestion].question,
                answer: data.results[this.state.currentQuestion].correct_answer,
                optionsList: newValue,
                loading: false,
              };
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  componentDidMount() {
    this.loadData();
  }

  nextQuestionView = () => {
    const { selectedAnswer, answer, scoreView } = this.state;

    if (selectedAnswer === answer) {
      this.setState({
        scoreView: scoreView + 1,
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
                triviaData: data.results,

                disabled: true,
                questions: data.results[this.state.currentQuestion].question,
                answer: data.results[this.state.currentQuestion].correct_answer,
                optionsList: newValue,
              };
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //check answer render
  checkData = (answer) => {
    this.setState({ selectedAnswer: answer, disabled: false });
  };

  // final answer handler
  finishData = () => {
    if (this.state.currentQuestion === this.state.triviaData.length - 1) {
      this.setState({
        completedAnswer: true,
      });
    }
  };
  render() {
    const {
      optionsList,
      selectedAnswer,
      currentQuestion,
      completedAnswer,
      triviaData,
      scoreView,
      questions,
      disabled,
    } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <div className="quiz-div">
            <img src={LoaderGif} alt="loader" />
          </div>
        ) : (
          <div className="quiz-div">
            {completedAnswer ? (
              <FinalScore triviaData={triviaData} scoreView={scoreView} />
            ) : (
              <Questions
                optionsList={optionsList}
                selectedAnswer={selectedAnswer}
                currentQuestion={currentQuestion}
                questions={questions}
                disabled={disabled}
                triviaData={triviaData}
                nextQuestionView={this.nextQuestionView}
                checkData={this.checkData}
                finishData={this.finishData}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
