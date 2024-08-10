import { useQuizContext } from "../context/QuizContext";

function Progress() {
  const { currentQuestionIndex, totalQuestions, totalPoints, score } =
    useQuizContext();

  return (
    <header className="progress">
      <progress value={currentQuestionIndex + 1} max={totalQuestions} />
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
