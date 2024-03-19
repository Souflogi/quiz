import Progress from "./Progress";
import Question from "./Question";

function ReviewAnswers({
  questions,
  dispatch,
  index,
  answers,
  score,
  totalPoints,
  totalQuestions,
}) {
  return (
    <>
      <Progress
        index={index}
        totalQuestions={totalQuestions}
        totalPoints={totalPoints}
        score={score}
        clickedAnswer={answers[index]}
      />
      <Question
        data={questions[index]}
        dispatch={dispatch}
        answer={answers[index]}
      />
      <div className="controls">
        <button
          className="btn"
          onClick={() => dispatch({ type: "NavigateReview", payload: -1 })}
        >
          ⬅️
        </button>
        <button className="btn" onClick={() => dispatch({ type: "Finishing" })}>
          ❌
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "NavigateReview", payload: 1 })}
        >
          ➡️
        </button>
      </div>
    </>
  );
}

export default ReviewAnswers;
