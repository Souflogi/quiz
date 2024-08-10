import { useQuizContext } from "../context/QuizContext";

function StartScreen() {
  const { dispatch, totalQuestions, difficulty } = useQuizContext();

  return (
    <div className="start">
      <h2> Welcome to the React Quiz</h2>
      <h3>{totalQuestions} questions to test your React mastery</h3>
      <div className="controls">
        <select
          value={difficulty}
          onChange={e =>
            dispatch({
              type: "CHANGE_DIFFICULTY",
              payload: Number(e.target.value),
            })
          }
        >
          <option value="10">Easy</option>
          <option value="20">Medium</option>
          <option value="30">Hard</option>
        </select>
        <button
          className="btn "
          onClick={() => dispatch({ type: "QUIZ_STARTED" })}
        >
          Lest's Start!
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
