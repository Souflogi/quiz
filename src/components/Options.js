function Options({ options, answer, onClick, correctOption }) {
  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          disabled={answer !== null}
          key={option}
          className={`btn btn-option 
          ${
            answer !== null ? (correctOption !== i ? "wrong" : "correct") : ""
          }  
          ${answer === i ? "answer" : ""}  
          ${
            answer === i
              ? answer !== correctOption
                ? "wrong-click"
                : "right-click"
              : ""
          } `}
          onClick={onClick.bind(null, i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
