import React, { useState } from 'react';

// local components
import QuestionCard from './components/QuestionCard';
import { TOTAL_QUESTIONS } from './constants';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }
  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className="start" onClick={startTrivia}>Start</button>
      <p className="score">Score:</p>
      <p>Loading questions...</p>
      <QuestionCard
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers[number]}
        callback={checkAnswer}
      />
      <button className='next' onClick={nextQuestion}>Next question</button>
    </div>
  );
}

export default App;
