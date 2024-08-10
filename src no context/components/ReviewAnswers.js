import Progress from "./Progress";
import Question from "./Question";

function ReviewScreen({
  questions,
  dispatch,
  currentQuestionIndex,
  userAnswers,
  score,
  totalPoints,
  totalQuestions,
}) {
  return (
    <>
      <Progress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        totalPoints={totalPoints}
        score={score}
        clickedAnswer={userAnswers[currentQuestionIndex]}
      />
      <Question
        data={questions[currentQuestionIndex]}
        clickedAnswer={userAnswers[currentQuestionIndex]}
      />
      <div className="controls">
        <button
          className="btn"
          onClick={() => dispatch({ type: "NAVIGATE_REVIEW", payload: -1 })}
        >
          ⬅️
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "FINISH_REVIEW" })}
        >
          ❌
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: "NAVIGATE_REVIEW", payload: 1 })}
        >
          ➡️
        </button>
      </div>
    </>
  );
}

export default ReviewScreen;
