function Options({ options, clickedAnswer, onClick, correctOption }) {
  const classNamer = index => {
    /*Blue or orange for correct/wrong options after selection.
Green or red specifically on the clicked button to indicate correctness.*/
    return `btn btn-option 
          ${
            // If clickedAnswer is not null (meaning an answer has been selected) Apply "wrong" or "correct"  --after selection-- --Non clicked ones-- (orange or blue)
            clickedAnswer !== null
              ? correctOption !== index
                ? "wrong"
                : "correct"
              : ""
          }  
          ${
            // Additional class to indicate whether the selected answer was correct or incorrect upon click --Clicked One-- (red or green)
            clickedAnswer === index
              ? clickedAnswer !== correctOption
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
          disabled={clickedAnswer !== null}
          key={option}
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
