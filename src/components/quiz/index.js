import React from "react";

const quizData = [
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "What was the name of the WWF professional wrestling tag team made up of the wrestlers Ax and Smash?",
    correct_answer: "Demolition",
    incorrect_answers: [
      "The Dream Team",
      "The Bushwhackers",
      "The British Bulldogs",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Area 51 is located in which US state?",
    correct_answer: "Nevada",
    incorrect_answers: ["Arizona", "New Mexico", "Utah"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Which American president appears on a one dollar bill?",
    correct_answer: "George Washington",
    incorrect_answers: [
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the shape of the toy invented by Hungarian professor Ernő Rubik?",
    correct_answer: "Cube",
    incorrect_answers: ["Sphere", "Cylinder", "Pyramid"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Red Vines is a brand of what type of candy?",
    correct_answer: "Licorice",
    incorrect_answers: ["Lollipop", "Chocolate", "Bubblegum"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "What do the letters in the GMT time zone stand for?",
    correct_answer: "Greenwich Mean Time",
    incorrect_answers: [
      "Global Meridian Time",
      "General Median Time",
      "Glasgow Man Time",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "How tall is the Burj Khalifa?",
    correct_answer: "2,722 ft",
    incorrect_answers: ["2,717 ft", "2,546 ft", "3,024 ft"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which of the following card games revolves around numbers and basic math?",
    correct_answer: "Uno",
    incorrect_answers: ["Go Fish", "Twister", "Munchkin"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "In which fast food chain can you order a Jamocha Shake?",
    correct_answer: "Arby&#039;s",
    incorrect_answers: ["McDonald&#039;s", "Burger King", "Wendy&#039;s"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question:
      "If you are caught &quot;Goldbricking&quot;, what are you doing wrong?",
    correct_answer: "Slacking",
    incorrect_answers: ["Smoking", "Stealing", "Cheating"],
  },
];

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    quizData,
  };

  loadQuizData = () => {
    // console.log(quizData[0].question);
    let valueThree = quizData[this.state.currentQuestion].incorrect_answers;
    let newValue = valueThree.concat(
      quizData[this.state.currentQuestion].correct_answer
    );
    console.log(newValue);
    console.log(quizData);
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].correct_answer,
        options: newValue,
      };
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
    let valueThree = quizData[this.state.currentQuestion].incorrect_answers;
    let newValue = valueThree.concat(
      quizData[this.state.currentQuestion].correct_answer
    );
    console.log(newValue);
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: newValue,
          answer: quizData[this.state.currentQuestion].answer,
        };
      });
    }
  }
  //check answer
  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true,
      });
    }
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;
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
