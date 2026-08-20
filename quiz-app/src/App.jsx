import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Which language is primarily used to build React applications?",
    options: ["Python", "JavaScript", "Java", "C++"],
    answer: "JavaScript",
  },
  {
    question: "Which hook is used to manage state in a React component?",
    options: ["useEffect", "useState", "useRef", "useContext"],
    answer: "useState",
  },
  {
    question: "Which command creates a new React project using Vite?",
    options: [
      "npm start react",
      "npm create vite@latest",
      "npm install react-app",
      "react create project",
    ],
    answer: "npm create vite@latest",
  },
  {
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (option) => {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      return;
    }

    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    setSelectedAnswer("");
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  const getOptionClass = (option) => {
    if (!selectedAnswer) {
      return "option";
    }

    if (option === question.answer) {
      return "option correct";
    }

    if (option === selectedAnswer) {
      return "option wrong";
    }

    return "option";
  };

  if (showResult) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="quiz-page">
        <div className="result-card">

          <div className="result-icon">
            🏆
          </div>

          <h1>Quiz Completed!</h1>

          <p className="result-message">
            Great job! Here is your final score.
          </p>

          <div className="score-circle">
            <span>{score}</span>
            <small>/ {questions.length}</small>
          </div>

          <h2>{percentage}%</h2>

          <p className="score-text">
            You answered {score} out of{" "}
            {questions.length} questions correctly.
          </p>

          <button
            className="restart-button"
            onClick={restartQuiz}
          >
            🔄 Restart Quiz
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">

      <div className="quiz-container">

        {/* Header */}

        <header className="quiz-header">

          <div className="quiz-logo">
            🧠
          </div>

          <div>
            <h1>Quiz App</h1>
            <p>Test your knowledge</p>
          </div>

        </header>

        {/* Progress */}

        <div className="progress-section">

          <div className="progress-info">
            <span>
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

            <span>
              Score: {score}
            </span>
          </div>

          <div className="progress-bar">

            <div
              className="progress"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            ></div>

          </div>

        </div>

        {/* Question Card */}

        <div className="question-card">

          <span className="question-number">
            Question {currentQuestion + 1}
          </span>

          <h2>
            {question.question}
          </h2>

          <div className="options">

            {question.options.map((option, index) => (

              <button
                key={option}
                className={getOptionClass(option)}
                onClick={() => handleAnswer(option)}
                disabled={Boolean(selectedAnswer)}
              >

                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="option-text">
                  {option}
                </span>

                {selectedAnswer &&
                  option === question.answer && (
                    <span className="answer-icon">
                      ✓
                    </span>
                  )}

                {selectedAnswer &&
                  option === selectedAnswer &&
                  option !== question.answer && (
                    <span className="answer-icon">
                      ✕
                    </span>
                  )}

              </button>

            ))}

          </div>

          {/* Feedback */}

          {selectedAnswer && (
            <div
              className={
                selectedAnswer === question.answer
                  ? "feedback correct-feedback"
                  : "feedback wrong-feedback"
              }
            >
              {selectedAnswer === question.answer
                ? "🎉 Correct! Well done."
                : `❌ Incorrect. The correct answer is ${question.answer}.`}
            </div>
          )}

          {/* Next Button */}

          <button
            className="next-button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;