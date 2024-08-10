import { useQuizContext } from "../context/QuizContext";
import Button from "./Button";
import Progress from "./Progress";
import Question from "./Question";

function ReviewScreen() {
  const { dispatch } = useQuizContext();
  return (
    <>
      <Progress />
      <Question />
      <div className="controls">
        <Button
          action={() => dispatch({ type: "NAVIGATE_REVIEW", payload: -1 })}
        >
          ⬅️
        </Button>
        <Button action={() => dispatch({ type: "FINISH_REVIEW" })}>❌</Button>
        <Button
          action={() => dispatch({ type: "NAVIGATE_REVIEW", payload: 1 })}
        >
          ➡️
        </Button>
      </div>
    </>
  );
}

export default ReviewScreen;
