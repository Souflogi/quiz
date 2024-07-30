import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const QuizContextProvider = ({ children }) => {
  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
};

const useQuizContext = () => {
  if (useContext(QuizContext) === undefined)
    throw new Error(
      "You are trying to consume context data outside its provider"
    );
  return useContext(QuizContext);
};

export { useQuizContext, QuizContextProvider };
