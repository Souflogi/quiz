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
import ReviewScreen from "./ReviewScreen";
import { useQuizContext } from "../context/QuizContext";

// Main application component
export default function App() {
  const {
    status,
    duration,
    clickedAnswer,
    currentQuestionIndex,
    totalQuestions,
    dispatch,
  } = useQuizContext();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              {clickedAnswer !== null ? (
                <Button action={() => dispatch({ type: "NEXT_QUESTION" })}>
                  {currentQuestionIndex === totalQuestions - 1
                    ? "Open Results"
                    : "NEXT"}
                </Button>
              ) : null}

              {status === "active" && (
                <Timer
                  duration={duration}
                  tickAction={timeLeft =>
                    dispatch({ type: "TICK", payload: timeLeft })
                  }
                  endAction={() => dispatch({ type: "TIME_UP" })}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
        {status === "review" && <ReviewScreen />}
      </Main>
    </div>
  );
}
