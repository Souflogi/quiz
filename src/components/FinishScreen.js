import { useQuizContext } from "../context/QuizContext";

function FinishScreen() {
  const { score, timeRemaining, highScore, totalPoints, dispatch, duration } =
    useQuizContext();

  const minutes = Math.floor((duration + 1 - timeRemaining) / 60); //duration is the initial seconds amount to know how long the user took to finish
  const seconds = Math.floor((duration + 1 - timeRemaining) % 60);

  let emoji = "";

  const percentage = (score * 100) / totalPoints;
  if (percentage < 20) emoji = "🥲";
  if (percentage > 20 && percentage < 50) emoji = "☹️";
  if (percentage > 50 && percentage < 70) emoji = "🙂";
  if (percentage > 70) emoji = "☺️";

  function NewGamehandler() {
    if (score < highScore) dispatch({ type: "START_NEW_GAME" });
    else dispatch({ type: "START_NEW_GAME", payload: score });
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
        <button
          className="btn"
          onClick={() => dispatch({ type: "REVIEW_ANSWERS" })}
        >
          Review 🧾
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "greenyellow", color: "#333" }}
          onClick={() => NewGamehandler()}
        >
          New game
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
