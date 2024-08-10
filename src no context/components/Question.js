import Options from "./Options";

function Question({ data, dispatch, clickedAnswer }) {
  const { question, options, correctOption } = data;

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
