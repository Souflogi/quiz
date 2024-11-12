/************************************************* */ /************************************************* */ /************************************************* */ /************************************************* */
// this is a standalone project *************************************************************************
/************************************************* */

import { useReducer } from "react";

// Initial state for the reducer
const initialState = {
  count: 0, // Number of days to add/subtract from the current date
  step: 1, // Step value for incrementing/decrementing the count
};

// Reducer function to manage the state
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + state.step, // Increment the count by the step value
      };
    case "decrement":
      return {
        ...state,
        count: state.count - state.step, // Decrement the count by the step value
      };
    case "defineCount":
      return {
        ...state,
        count: action.payload, // Set the count to a specific value
      };
    case "defineStep":
      return {
        ...state,
        step: action.payload, // Set the step value to a specific value
      };
    case "reset":
      return initialState; // Reset the state to the initial state
    default:
      return state;
  }
}

/****************************************************************************** */
function DateCounter() {
  // Use the useReducer hook to manage state with the reducer function and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create a new date object and adjust it by the current count value
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + state.count);

  // Handler for decrementing the count
  const decrement = function () {
    dispatch({ type: "decrement" });
  };

  // Handler for incrementing the count
  const increment = function () {
    dispatch({ type: "increment" });
  };

  // Handler for setting a specific count value
  const setCount = function (e) {
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  // Handler for setting a specific step value
  const setStep = function (e) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  // Handler for resetting the state
  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={setStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={decrement}>-</button>
        <input type="text" value={state.count} onChange={setCount} />
        <button onClick={increment}>+</button>
      </div>

      <p>{currentDate.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
