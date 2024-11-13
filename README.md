# Quiz App

This is a React-based Quiz Application that allows users to select quiz difficulty, answer questions, and review their results. This README will help you get started with understanding and running the project.

## Features

- **Difficulty Level Selection**: Filter questions by difficulty (e.g., 10, 20, 30 points).
- **Dynamic Quiz Flow**: Start a quiz, answer questions, and automatically proceed to the next one.
- **Time Management**: Each question comes with a set time limit to answer.
- **Review Mode**: After completing the quiz, users can review their answers and navigate through each question.
- **High Score Tracking**: Track and store the highest score between sessions.

## Tech Stack

- **React**: For UI components and state management.
- **React Context and Reducer**: To manage state globally, ensuring clean and efficient application state transitions.
- **JavaScript**: Handles logic, actions, and event management within the application.
- **CSS Modules**: For styling components in a modular and reusable manner.

## Installation and Setup

To run this project locally, follow these steps:

### Prerequisites

- Make sure you have **Node.js** and **npm** or **yarn** installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd quiz-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Project

- To start the development server, run:
  ```bash
  npm start
  ```
  or
  ```bash
  yarn start
  ```
- Open your browser and navigate to `http://localhost:3000` to view the application.

## State Management Overview

The quiz app uses **React Context** and **useReducer** for managing state. Below is a brief description of how the main pieces fit together:

- **Context Provider**: The `QuizContextProvider` wraps the entire application, making quiz-related state accessible anywhere within the app.
- **Reducer Actions**: The reducer manages state through various actions, such as:
  - **`REQUEST_SENT`**: Sets loading state when fetching data.
  - **`DATA_RECEIVED`**: Updates state with received questions.
  - **`QUIZ_STARTED`**: Starts the quiz and sets the countdown timer.
  - **`ANSWER_SELECTED`**: Handles user answer selection and score calculation.
  - **`NEXT_QUESTION`**: Proceeds to the next question.
  - **`REVIEW_ANSWERS`**: Sets the state to review mode afte
