function Progress({
  currentQuestionIndex,
  totalQuestions,
  totalPoints,
  score,
  clickedAnswer,
}) {
  return (
    <header className="progress">
      <progress
        value={currentQuestionIndex + Number(clickedAnswer !== null)}
        max={totalQuestions}
      />
      <p>
        Question <strong> {currentQuestionIndex + 1} </strong>/ {totalQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
