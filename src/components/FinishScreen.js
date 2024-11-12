import { useQuizContext } from "../context/QuizContext";

function FinishScreen() {
  const { score, highScore, totalPoints, dispatch, duration, timeRemaining } =
    useQuizContext();

  const minutes = Math.floor((duration + 1 - timeRemaining) / 60); //duration is the initial seconds amount to know how long the user took to finish
  const seconds = Math.floor((duration + 1 - timeRemaining) % 60);

  // Emoji map based on score percentage
  const emojiMap = [
    { min: 0, max: 20, emoji: "🥲" },
    { min: 21, max: 50, emoji: "☹️" },
    { min: 51, max: 70, emoji: "🙂" },
    { min: 71, max: 100, emoji: "🤩" },
  ];

  function getEmoji(percentage) {
    const range = emojiMap.find(
      ({ min, max }) => percentage >= min && percentage <= max
    );
    return range ? range.emoji : "";
  }

  // Usage
  const percentage = (score * 100) / totalPoints;
  const emoji = getEmoji(percentage);

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
      {score > highScore && (
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
