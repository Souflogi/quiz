function Options({ options, selectedAnswer, onClick, correctOption }) {
  const classNamer = index => {
    return `btn btn-option 
          ${
            // Apply "wrong" or "correct" class based on whether an option is incorrect or correct after selection (orange or blue)
            selectedAnswer !== null
              ? correctOption !== index
                ? "wrong"
                : "correct"
              : ""
          }  
          ${
            // Additional class to indicate whether the selected answer was correct or incorrect upon click (red or green)
            selectedAnswer === index
              ? selectedAnswer !== correctOption
                ? "wrong-click"
                : "right-click"
              : ""
          } `;
  };
  /****************************************************** */
  return (
    // Container div for options
    <div className="options">
      {options.map((option, i) => (
        // Button for each option
        <button
          // Disable button if an answer is already selected
          disabled={selectedAnswer !== null}
          key={option} // Unique key for each button
          className={classNamer(i)}
          // Click handler, binds the index of the option to onClick function
          onClick={onClick.bind(null, i)}
        >
          {option} {/* Display the option text */}
        </button>
      ))}
    </div>
  );
}

export default Options;
