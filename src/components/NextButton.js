function NextButton({ dispatch, index, totalQuestions }) {
  const buttonText = index === totalQuestions - 1 ? "Open Results" : "NEXT";
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      style={buttonText !== "NEXT" ? { backgroundColor: "#11c876" } : {}}
    >
      {buttonText}
    </button>
  );
}

export default NextButton;
