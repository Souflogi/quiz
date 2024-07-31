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

/*
start with understanding and cleaning the code for example inside progress component there is a none used prop 

GOOD LUCK YOU GOT IT this is your code you made this now just redo what you did BOSS


*/
