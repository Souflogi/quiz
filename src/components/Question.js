import Options from "./Options";

function Question({ data, dispatch, answer }) {
  const { question, options, correctOption } = data;

  function onClick(index) {
    dispatch({ type: "UserClicked", payload: index });
  }

  return (
    <>
      <h4>{question}</h4>
      <Options
        options={options}
        onClick={onClick}
        correctOption={correctOption}
        answer={answer}
      />
    </>
  );
}

export default Question;
