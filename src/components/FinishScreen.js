function FinishScreen({
  score,
  highScore,
  totalPoints,
  dispatch,
  secondsRemaining,
  initialTime,
}) {
  const percentage = (score * 100) / totalPoints;
  const minutes = Math.floor((initialTime - secondsRemaining) / 60); //initialTime is the initial seconds amount to know how ling the user took to finish
  const seconds = Math.floor((initialTime - secondsRemaining) % 60);

  let emoji = "";

  if (percentage < 20) emoji = "🥲";
  if (percentage > 20 && percentage < 50) emoji = "☹️";
  if (percentage > 50 && percentage < 70) emoji = "🙂";
  if (percentage > 70) emoji = "☺️";

  function clickHandler() {
    if (score < highScore) dispatch({ type: "StartNewGame" });
    else dispatch({ type: "StartNewGame", payload: score });
  }

  return (
    <>
      <p className="result">
        Your Score <strong> {score} </strong>
        out of {totalPoints} ({Math.ceil(percentage)}%)
        {emoji}
      </p>
      {score < highScore ? (
        <p className="highscore" style={{ color: "red" }}>
          (😖 Did not beat the highscore of <strong>{highScore}</strong>{" "}
          points.)
        </p>
      ) : (
        <p className="highscore" style={{ color: "greenyellow" }}>
          (Congratulations You scored the Top Score 🥳)
        </p>
      )}
      <p
        style={{ textAlign: "center", fontSize: "3rem", marginBottom: "2rem" }}
      >
        Elapsed time ⏱️ : {minutes.toString().padStart(2, 0)}:
        {seconds.toString().padStart(2, 0)}
      </p>
      <div className="controls">
        <button className="btn" onClick={() => dispatch({ type: "Reviewing" })}>
          Review 🧾
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "greenyellow", color: "#333" }}
          onClick={() => clickHandler()}
        >
          New game
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
