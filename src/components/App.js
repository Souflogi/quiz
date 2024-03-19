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

const SECs_PER_QUESTION = 60;

function timeCalculator(arrayLength) {
  return Math.floor((arrayLength / 2) * SECs_PER_QUESTION);
}

/************************************************* */
const initialState = {
  questions: [],
  difficulty: 10,
  /* loading, error ,ready ,active, finished , */
  status: null,
  index: 0,
  clickedAnswer: null,
  answers: [] /*user answers*/,

  score: 0,
  highScore: 10,
  secondsRemaining: 0,
  initialTime: 0,
  ticking: false,
};
/************************************************************* */
const reducer = (state, action) => {
  switch (action.type) {
    case "RequestSent":
      return { ...state, status: "loading" };
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload.filter(q => q.points === state.difficulty),
      };
    case "DataFailed":
      return { ...state, status: "error" };
    case "diffChange":
      return { ...state, difficulty: action.payload };
    case "QuizStarts":
      return {
        ...state,
        status: "active",
        ticking: true,
        secondsRemaining: timeCalculator(state.questions.length),
        initialTime: timeCalculator(state.questions.length),
      };
    case "Tick":
      if (state.secondsRemaining < 1) return { ...state, status: "finished" };
      else return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    case "UserClicked":
      const { correctOption, points } = state.questions[state.index];
      const pointsWon = correctOption === action.payload ? points : 0;
      return {
        ...state,
        clickedAnswer: action.payload,
        answers: [...state.answers, action.payload],
        score: state.score + pointsWon,
        ticking: !(state.index === state.questions.length - 1),
      };
    case "NextQuestion":
      if (state.index < state.questions.length - 1)
        return { ...state, index: state.index + 1, clickedAnswer: null };
      else return { ...state, status: "finished" };

    case "StartNewGame":
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
        highScore: action?.payload ?? state.highScore,
        secondsRemaining: timeCalculator(state.questions.length),
        initialTime: timeCalculator(state.questions.length),
        ticking: true,
      };
    case "Finishing":
      return { ...state, status: "finished" };
    case "Reviewing":
      return { ...state, index: 0, status: "reviewing" };
    case "NavigateReview":
      const step = action.payload;
      if (
        state.index + step === state.questions.length ||
        state.index + step < 0
      )
        return { ...state };
      return { ...state, index: state.index + step };

    default:
      throw new Error("Action is unknown");
  }
};
/**************************************************************************** */
export default function App() {
  const [
    {
      questions,
      answers,
      difficulty,
      status,
      index,
      clickedAnswer,
      score,
      highScore,
      secondsRemaining,
      initialTime,
      ticking,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    async function loadData() {
      console.log("loading");
      dispatch({ type: "RequestSent" });
      try {
        const resp = await fetch("http://localhost:8000/questions");
        const data = await resp.json();
        if (!data) throw new Error("Something is wrong");
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "DataFailed" });
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
              index={index}
              totalQuestions={totalQuestions}
              totalPoints={totalPoints}
              score={score}
              clickedAnswer={clickedAnswer}
            />
            <Question
              data={questions[index]}
              dispatch={dispatch}
              answer={clickedAnswer}
            />
            <Footer>
              <NextButton
                index={index}
                totalQuestions={totalQuestions}
                clickedAnswer={clickedAnswer}
                dispatch={dispatch}
              />
              {
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                  ticking={ticking}
                />
              }
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            secondsRemaining={secondsRemaining}
            initialTime={initialTime}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "reviewing" && (
          <ReviewAnswers
            questions={questions}
            dispatch={dispatch}
            answers={answers}
            index={index}
            totalPoints={totalPoints}
            totalQuestions={totalQuestions}
            score={score}
          />
        )}
      </Main>
    </div>
  );
}
