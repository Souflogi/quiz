function NextButton({ clickedAnswer, dispatch, index, totalQuestions }) {
  if (clickedAnswer === null) return null;
  const buttonText = index === totalQuestions - 1 ? "Open Results" : "NEXT";
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "NextQuestion" })}
      style={buttonText !== "NEXT" ? { backgroundColor: "#11c876" } : {}}
    >
      {buttonText}
    </button>
  );
}

export default NextButton;
