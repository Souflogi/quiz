import { useQuizContext } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { currentQuestionData, dispatch, clickedAnswer } = useQuizContext();

  const { question, options, correctOption } = currentQuestionData;

  function onClick(index) {
    dispatch({ type: "ANSWER_SELECTED", payload: index });
  }

  return (
    <>
      <h4>{question}</h4>
      <Options
        options={options}
        onClick={onClick}
        correctOption={correctOption}
        clickedAnswer={clickedAnswer}
      />
    </>
  );
}

export default Question;
