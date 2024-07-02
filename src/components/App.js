import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import ReviewAnswers from "./ReviewAnswers";

// Constants
const SECONDS_PER_QUESTION = 60; // Time allocated per question in seconds
const API_KEY = "$2a$10$eo2ivnUnHgDq76H5J4jbLuTquIKreKeji40mzWwJS7/H302VZz8kC"; // API key for accessing the questions

function calculateQuizTime(numQuestions) {
  return Math.floor((numQuestions / 2) * SECONDS_PER_QUESTION);
}

// Initial state of the application
const initialState = {
  questions: [], // Array to store quiz questions
  difficulty: 10, // Default difficulty level
  status: null, // Status of the quiz: loading, error, ready, active, finished, reviewing
  currentQuestionIndex: 0, // Index of the current question
  selectedAnswer: null, // The answer selected by the user
  userAnswers: [], // User's answers
  score: 0, // User's score
  highScore: 10, // Highest score
  timeRemaining: 0, // Time remaining for the quiz
  initialTime: 0, // Initial time set for the quiz
  timerRunning: false, // Whether the timer is running
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_SENT":
      return { ...state, status: "loading" }; // Set status to loading when request is sent
    case "DATA_RECEIVED":
      return {
        ...state,
        status: "ready", // Set status to ready when data is received
        questions: action.payload.filter(q => q.points === state.difficulty), // Filter questions based on difficulty
      };
    case "DATA_FAILED":
      return { ...state, status: "error" }; // Set status to error if data fetch fails
    case "CHANGE_DIFFICULTY":
      return { ...state, difficulty: action.payload }; // Change difficulty level
    case "QUIZ_STARTED":
      return {
        ...state,
        status: "active", // Set status to active when quiz starts
        timerRunning: true, // Start the timer
        timeRemaining: calculateQuizTime(state.questions.length), // Set the initial time
        initialTime: calculateQuizTime(state.questions.length), // Set the remaining time
      };
    case "TICK":
      if (state.timeRemaining < 1)
        return { ...state, status: "finished" }; // Finish quiz if time is up
      else return { ...state, timeRemaining: state.timeRemaining - 1 }; // Decrement remaining time
    case "ANSWER_SELECTED":
      const { correctOption, points } =
        state.questions[state.currentQuestionIndex];
      const pointsEarned = correctOption === action.payload ? points : 0; // Calculate points earned
      return {
        ...state,
        selectedAnswer: action.payload, // Store the selected answer
        userAnswers: [...state.userAnswers, action.payload], // Add the answer to the list of answers
        score: state.score + pointsEarned, // Update score
        timerRunning: !(
          state.currentQuestionIndex ===
          state.questions.length - 1
        ), // Stop timer if it was the last question
      };
    case "NEXT_QUESTION":
      if (state.currentQuestionIndex < state.questions.length - 1)
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          selectedAnswer: null,
        };
      // Move to next question
      else return { ...state, status: "finished" }; // Finish quiz if it was the last question
    case "START_NEW_GAME":
      return {
        ...initialState,
        questions: state.questions, // Reset state but keep the questions
        status: "active", // Set status to active
        highScore: action?.payload ?? state.highScore, // Set high score
        timeRemaining: calculateQuizTime(state.questions.length), // Reset time
        initialTime: calculateQuizTime(state.questions.length), // Reset initial time
        timerRunning: true, // Start the timer
      };
    case "FINISH_QUIZ":
      return { ...state, status: "finished" }; // Set status to finished
    case "REVIEW_ANSWERS":
      return { ...state, currentQuestionIndex: 0, status: "reviewing" }; // Set status to reviewing
    case "NAVIGATE_REVIEW":
      const step = action.payload;
      if (
        state.currentQuestionIndex + step === state.questions.length ||
        state.currentQuestionIndex + step < 0
      )
        return { ...state }; // Prevent navigating out of bounds
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + step,
      }; // Navigate to next or previous question
    default:
      throw new Error("Unknown action type"); // Throw error for unknown actions
  }
};

// Main application component
export default function App() {
  const [
    {
      questions,
      userAnswers,
      difficulty,
      status,
      currentQuestionIndex,
      selectedAnswer,
      score,
      highScore,
      timeRemaining,
      initialTime,
      timerRunning,
    },
    dispatch,
  ] = useReducer(quizReducer, initialState);

  const totalQuestions = questions.length; // Total number of questions
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0); // Total points available

  // Effect to load data on difficulty change
  useEffect(() => {
    async function loadData() {
      dispatch({ type: "REQUEST_SENT" });
      try {
        const resp = await fetch(
          "https://api.jsonbin.io/v3/b/666b0e7bad19ca34f87886fd",
          {
            headers: {
              "X-Master-Key": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await resp.json();

        if (!data) throw new Error("Something is wrong");

        dispatch({ type: "DATA_RECEIVED", payload: data.record.questions });
      } catch (error) {
        dispatch({ type: "DATA_FAILED" });
      }
    }
    loadData();
  }, [difficulty]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            dispatch={dispatch}
            totalQuestions={totalQuestions}
            difficulty={difficulty}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              totalPoints={totalPoints}
              score={score}
              selectedAnswer={selectedAnswer}
            />
            <Question
              data={questions[currentQuestionIndex]}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
            />
            <Footer>
              {selectedAnswer !== null ? (
                <NextButton
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={totalQuestions}
                  dispatch={dispatch}
                />
              ) : null}

              <Timer
                timeRemaining={timeRemaining}
                dispatch={dispatch}
                timerRunning={timerRunning}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            timeRemaining={timeRemaining}
            highScore={highScore}
            totalPoints={totalPoints}
            dispatch={dispatch}
            initialTime={initialTime}
          />
        )}
        {status === "reviewing" && (
          <ReviewAnswers
            questions={questions}
            dispatch={dispatch}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            score={score}
            totalPoints={totalPoints}
            totalQuestions={totalQuestions}
          />
        )}
      </Main>
    </div>
  );
}
