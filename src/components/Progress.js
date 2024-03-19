function Progress({
  index,
  totalQuestions,
  totalPoints,
  score,
  clickedAnswer,
}) {
  return (
    <header className="progress">
      <progress
        value={index + Number(clickedAnswer !== null)}
        max={totalQuestions}
      />
      <p>
        Question <strong> {index + 1} </strong>/ {totalQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
