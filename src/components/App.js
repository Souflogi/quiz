import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import ReviewAnswers from "./ReviewAnswers";

// Constants
const SECONDS_PER_QUESTION = 30; // Time allocated per question in seconds
const API_KEY = "$2a$10$eo2ivnUnHgDq76H5J4jbLuTquIKreKeji40mzWwJS7/H302VZz8kC"; // API key for accessing Data on jsonbin.io
const BASE_URL = "https://api.jsonbin.io/v3/b/666b0e7bad19ca34f87886fd";

function calculateQuizTime(numQuestions) {
  return numQuestions * SECONDS_PER_QUESTION;
}

// Initial state of the application
const initialState = {
  questions: [], // Array to store quiz questions
  filtredQuestions: [], // this holds the filtred question by difficulty
  difficulty: 10, // Default difficulty level (quetion points are the same as its difficulty 10 20 30 )
  status: null, // Status of the quiz: loading, error, ready, active, finished, reviewing
  currentQuestionIndex: 0, // Index of the current question
  selectedAnswer: null, // The answer selected by the user
  userAnswers: [], // User's answers
  score: 0, // User's score
  highScore: 10, // Highest score
  timeRemaining: 0, // Time remaining for the quiz
  timerOn: false, // Whether the timer is running
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_SENT":
      return { ...state, status: "loading" }; // Set status to loading when request is sent

    case "DATA_RECEIVED":
      return {
        ...state,
        status: "ready", // Set status to ready when data is received
        questions: action.payload, // Filter questions based on difficulty
        filtredQuestions: action.payload.filter(
          q => q.points === state.difficulty
        ),
      };

    case "DATA_FAILED":
      return { ...state, status: "error" }; // Set status to error if data fetch fails

    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
        filtredQuestions: state.questions.filter(
          q => q.points === action.payload
        ),
      }; // Change difficulty level

    case "QUIZ_STARTED":
      return {
        ...state,
        status: "active", // Set status to active when quiz starts
        timerOn: true, // Start the timer
        timeRemaining: calculateQuizTime(state.filtredQuestions.length), // Set the initial time
      };

    case "TICK":
      if (state.timeRemaining < 1)
        return { ...state, status: "finished" }; // Finish quiz if time is up
      else return { ...state, timeRemaining: state.timeRemaining - 1 }; // Decrement remaining time

    case "ANSWER_SELECTED":
      const { correctOption, points } =
        state.filtredQuestions[state.currentQuestionIndex];
      const pointsEarned = correctOption === action.payload ? points : 0; // Calculate points earned
      return {
        ...state,
        selectedAnswer: action.payload, // Store the selected answer
        userAnswers: [...state.userAnswers, action.payload], // Add the answer to the list of answers
        score: state.score + pointsEarned, // Update score
        timerOn: !(
          state.currentQuestionIndex ===
          state.filtredQuestions.length - 1
        ), // Stop timer if it was the last question
      };

    case "NEXT_QUESTION":
      if (state.currentQuestionIndex < state.filtredQuestions.length - 1)
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
        filtredQuestions: state.questions.filter(
          q => q.points === initialState.difficulty
        ),
        status: "ready", // Set status to active
        highScore: action?.payload ?? state.highScore, // Set high score
        timeRemaining: calculateQuizTime(state.filtredQuestions.length), // Reset time
        initialTime: calculateQuizTime(state.filtredQuestions.length), // Reset initial time
        timerOn: true, // Start the timer
      };

    case "REVIEW_ANSWERS":
      return { ...state, currentQuestionIndex: 0, status: "reviewing" }; // Set status to reviewing

    case "NAVIGATE_REVIEW":
      const step = action.payload;
      if (
        state.currentQuestionIndex + step === state.filtredQuestions.length ||
        state.currentQuestionIndex + step < 0
      )
        return { ...state }; // Prevent navigating out of bounds
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + step,
      }; // Navigate to next or previous question

    case "FINISH_REVIEW":
      return { ...state, status: "finished" }; // Set status to finished

    default:
      throw new Error("Unknown action type"); // Throw error for unknown actions
  }
};

// Main application component
export default function App() {
  const [
    {
      filtredQuestions,
      userAnswers,
      difficulty,
      status,
      currentQuestionIndex,
      selectedAnswer,
      score,
      highScore,
      timeRemaining,
      timerOn,
    },
    dispatch,
  ] = useReducer(quizReducer, initialState);

  const totalQuestions = filtredQuestions.length; // Total number of questions
  const totalPoints = filtredQuestions.reduce(
    (acc, curr) => acc + curr.points,
    0
  ); // Total points available
  const initialTime = calculateQuizTime(totalQuestions); // dirived state of the quize  duration

  // Effect to load data on difficulty change
  useEffect(() => {
    async function loadData() {
      dispatch({ type: "REQUEST_SENT" });
      try {
        const resp = await fetch(BASE_URL, {
          headers: {
            "X-Master-Key": API_KEY,
            "Content-Type": "application/json",
          },
        });

        const data = await resp.json();

        if (!data) throw new Error("Something is wrong");

        dispatch({ type: "DATA_RECEIVED", payload: data.record.questions });
      } catch (error) {
        dispatch({ type: "DATA_FAILED" });
      }
    }
    loadData();
  }, []);

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
              data={filtredQuestions[currentQuestionIndex]}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
            />
            <Footer>
              {selectedAnswer !== null ? (
                <Button action={() => dispatch({ type: "NEXT_QUESTION" })}>
                  {currentQuestionIndex === totalQuestions - 1
                    ? "Open Results"
                    : "NEXT"}
                </Button>
              ) : null}

              <Timer
                timeRemaining={timeRemaining}
                dispatch={dispatch}
                timerOn={timerOn}
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
            questions={filtredQuestions}
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
