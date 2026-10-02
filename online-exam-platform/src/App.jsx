import { useEffect, useState } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "Which language is primarily used to structure a web page?",
    options: ["CSS", "HTML", "Python", "SQL"],
    answer: "HTML",
  },
  {
    id: 2,
    question: "Which technology is used to style web pages?",
    options: ["HTML", "CSS", "React", "Django"],
    answer: "CSS",
  },
  {
    id: 3,
    question: "Which of the following is a JavaScript library?",
    options: ["React", "MySQL", "Django", "MongoDB"],
    answer: "React",
  },
  {
    id: 4,
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    id: 5,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Application Program Internet",
      "Advanced Programming Interface",
      "Application Process Integration",
    ],
    answer: "Application Programming Interface",
  },
  {
    id: 6,
    question: "Which language is commonly used with Django?",
    options: ["Java", "Python", "C++", "Ruby"],
    answer: "Python",
  },
  {
    id: 7,
    question: "Which command is commonly used to start a Vite development server?",
    options: ["npm start", "npm run dev", "npm server", "vite start"],
    answer: "npm run dev",
  },
  {
    id: 8,
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<href>", "<a>", "<url>"],
    answer: "<a>",
  },
  {
    id: 9,
    question: "Which CSS property changes the text color?",
    options: ["font-color", "text-color", "color", "foreground"],
    answer: "color",
  },
  {
    id: 10,
    question: "Which database is often used for simple local Django development?",
    options: ["SQLite", "Redis", "Oracle", "Cassandra"],
    answer: "SQLite",
  },
];

const EXAM_TIME = 10 * 60;

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [markedQuestions, setMarkedQuestions] = useState([]);

  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);

  const [examStarted, setExamStarted] = useState(false);

  const [examFinished, setExamFinished] = useState(false);

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!examStarted || examFinished) {
      return;
    }

    if (timeLeft <= 0) {
      finishExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeft]);

  const startExam = () => {
    setExamStarted(true);
    setExamFinished(false);
    setResult(null);
    setCurrentQuestion(0);
    setAnswers({});
    setMarkedQuestions([]);
    setTimeLeft(EXAM_TIME);
  };

  const selectAnswer = (answer) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: answer,
    });
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleMark = () => {
    const questionId = questions[currentQuestion].id;

    if (markedQuestions.includes(questionId)) {
      setMarkedQuestions(
        markedQuestions.filter((id) => id !== questionId)
      );
    } else {
      setMarkedQuestions([...markedQuestions, questionId]);
    }
  };

  const finishExam = () => {
    let score = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        score++;
      }
    });

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const attempted = Object.keys(answers).length;

    setResult({
      score,
      percentage,
      attempted,
      total: questions.length,
      unanswered: questions.length - attempted,
    });

    setExamFinished(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const getResultMessage = () => {
    if (!result) return "";

    if (result.percentage >= 80) {
      return "Excellent performance! You have demonstrated a strong understanding of the topics.";
    }

    if (result.percentage >= 60) {
      return "Good performance! Keep practicing to improve your score further.";
    }

    if (result.percentage >= 40) {
      return "You have a basic understanding. More practice can help improve your result.";
    }

    return "Keep learning and practicing. You can improve your score with more preparation.";
  };

  // WELCOME PAGE

  if (!examStarted) {
    return (
      <div className="app welcome-page">
        <header className="top-header">
          <div className="brand">
            <div className="brand-icon">EX</div>

            <div>
              <h2>ExamPro</h2>
              <span>Online Examination Platform</span>
            </div>
          </div>
        </header>

        <main className="welcome-content">
          <div className="welcome-card">
            <div className="exam-icon">📝</div>

            <span className="welcome-label">
              ONLINE EXAMINATION
            </span>

            <h1>Web Development Assessment</h1>

            <p>
              Test your knowledge of HTML, CSS, JavaScript,
              React, Python and web development fundamentals.
            </p>

            <div className="exam-info">
              <div>
                <strong>{questions.length}</strong>
                <span>Questions</span>
              </div>

              <div>
                <strong>10</strong>
                <span>Minutes</span>
              </div>

              <div>
                <strong>MCQ</strong>
                <span>Question Type</span>
              </div>

              <div>
                <strong>100</strong>
                <span>Total Marks</span>
              </div>
            </div>

            <div className="instructions">
              <h3>Exam Instructions</h3>

              <ul>
                <li>
                  Each question has one correct answer.
                </li>

                <li>
                  You can move between questions using
                  Previous and Next.
                </li>

                <li>
                  You can mark questions for review.
                </li>

                <li>
                  The exam will automatically submit when
                  the timer reaches zero.
                </li>

                <li>
                  Make sure to submit before the time expires.
                </li>
              </ul>
            </div>

            <button className="start-btn" onClick={startExam}>
              Start Exam →
            </button>
          </div>
        </main>
      </div>
    );
  }

  // RESULT PAGE

  if (examFinished && result) {
    return (
      <div className="app">
        <header className="top-header">
          <div className="brand">
            <div className="brand-icon">EX</div>

            <div>
              <h2>ExamPro</h2>
              <span>Online Examination Platform</span>
            </div>
          </div>
        </header>

        <main className="result-page">
          <div className="result-card">
            <div className="result-icon">
              {result.percentage >= 40 ? "✓" : "!"}
            </div>

            <span className="result-label">
              EXAM COMPLETED
            </span>

            <h1>Your Exam Result</h1>

            <p className="result-message">
              {getResultMessage()}
            </p>

            <div className="score-circle">
              <strong>{result.percentage}%</strong>
              <span>Score</span>
            </div>

            <div className="result-stats">
              <div>
                <span>Total Questions</span>
                <strong>{result.total}</strong>
              </div>

              <div>
                <span>Attempted</span>
                <strong>{result.attempted}</strong>
              </div>

              <div>
                <span>Correct</span>
                <strong className="correct-text">
                  {result.score}
                </strong>
              </div>

              <div>
                <span>Incorrect</span>
                <strong className="wrong-text">
                  {result.attempted - result.score}
                </strong>
              </div>

              <div>
                <span>Unanswered</span>
                <strong>{result.unanswered}</strong>
              </div>
            </div>

            <div className="result-actions">
              <button
                className="secondary-btn"
                onClick={() => {
                  setCurrentQuestion(0);
                  setExamFinished(false);
                }}
              >
                Review Answers
              </button>

              <button className="start-btn" onClick={startExam}>
                Take Exam Again
              </button>
            </div>
          </div>

          <div className="answer-review">
            <h2>Answer Review</h2>

            {questions.map((question, index) => {
              const userAnswer = answers[question.id];

              const isCorrect =
                userAnswer === question.answer;

              return (
                <div
                  className={`review-card ${
                    isCorrect ? "review-correct" : "review-wrong"
                  }`}
                  key={question.id}
                >
                  <div className="review-number">
                    {index + 1}
                  </div>

                  <div className="review-content">
                    <h3>{question.question}</h3>

                    <p>
                      <strong>Your Answer:</strong>{" "}
                      {userAnswer || "Not Answered"}
                    </p>

                    <p>
                      <strong>Correct Answer:</strong>{" "}
                      {question.answer}
                    </p>
                  </div>

                  <div className="review-status">
                    {isCorrect ? "✓ Correct" : "✕ Wrong"}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // EXAM PAGE

  const question = questions[currentQuestion];

  const selectedAnswer = answers[question.id];

  const answeredCount = Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="app exam-page">
      <header className="exam-header">
        <div className="exam-header-left">
          <div className="brand">
            <div className="brand-icon">EX</div>

            <div>
              <h2>ExamPro</h2>
              <span>Web Development Assessment</span>
            </div>
          </div>
        </div>

        <div className="timer">
          <span>⏱</span>
          <strong>{formatTime(timeLeft)}</strong>
        </div>

        <button
          className="submit-top-btn"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to submit the exam?"
            );

            if (confirmed) {
              finishExam();
            }
          }}
        >
          Submit Exam
        </button>
      </header>

      <div className="exam-layout">
        {/* SIDEBAR */}

        <aside className="question-sidebar">
          <div className="sidebar-heading">
            <h3>Questions</h3>
            <span>
              {answeredCount}/{questions.length}
            </span>
          </div>

          <div className="progress-container">
            <div className="progress-info">
              <span>Progress</span>
              <strong>
                {Math.round(
                  (answeredCount / questions.length) * 100
                )}
                %
              </strong>
            </div>

            <div className="progress-bar">
              <div
                style={{
                  width: `${
                    (answeredCount / questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="question-numbers">
            {questions.map((item, index) => {
              const answered = answers[item.id];
              const marked = markedQuestions.includes(item.id);

              return (
                <button
                  key={item.id}
                  className={`
                    question-number
                    ${
                      currentQuestion === index
                        ? "current"
                        : ""
                    }
                    ${answered ? "answered" : ""}
                  `}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}

                  {marked && (
                    <span className="marked-dot">★</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="legend">
            <div>
              <span className="legend-box current-box" />
              Current
            </div>

            <div>
              <span className="legend-box answered-box" />
              Answered
            </div>

            <div>
              <span className="legend-box marked-box" />
              Review
            </div>
          </div>
        </aside>

        {/* QUESTION AREA */}

        <main className="question-area">
          <div className="question-top">
            <span>
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

            <button
              className={`mark-btn ${
                markedQuestions.includes(question.id)
                  ? "marked"
                  : ""
              }`}
              onClick={toggleMark}
            >
              ★{" "}
              {markedQuestions.includes(question.id)
                ? "Marked for Review"
                : "Mark for Review"}
            </button>
          </div>

          <div className="question-progress">
            <div
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="question-card">
            <span className="question-label">
              QUESTION {currentQuestion + 1}
            </span>

            <h1>{question.question}</h1>

            <p className="choose-text">
              Choose the correct answer.
            </p>

            <div className="options">
              {question.options.map((option, index) => {
                const selected = selectedAnswer === option;

                return (
                  <button
                    key={option}
                    className={`option ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => selectAnswer(option)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>

                    <span className="option-radio">
                      {selected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="navigation">
            <button
              className="previous-btn"
              disabled={currentQuestion === 0}
              onClick={previousQuestion}
            >
              ← Previous
            </button>

            <span>
              {selectedAnswer
                ? "Answer selected"
                : "Not answered"}
            </span>

            {currentQuestion === questions.length - 1 ? (
              <button
                className="next-btn"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Submit your exam?"
                  );

                  if (confirmed) {
                    finishExam();
                  }
                }}
              >
                Finish Exam ✓
              </button>
            ) : (
              <button
                className="next-btn"
                onClick={nextQuestion}
              >
                Next →
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;