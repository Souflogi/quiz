import { useReducer, useState } from "react";

const initialstate = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + state.step,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - state.step,
      };
    case "defineCount":
      return {
        ...state,
        count: action.payload,
      };
    case "defineStep":
      return {
        ...state,
        step: action.payload,
      };
    case "reset":
      return initialstate;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialstate);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "decrement" });
  };

  const inc = function () {
    dispatch({ type: "increment" });
  };

  const defineCount = function (e) {
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

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
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
