import React, { useState, useEffect } from 'react'

// local components
import QuestionCard from './QuestionCard'

// api
import { fetchQuestions } from '../api'

// model
import { Difficulty } from '../model/enums'
import { TOTAL_QUESTIONS } from '../model/constants'
import { Answer, EnrichedQuestion } from '../model/types'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<EnrichedQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  // derived state
  const hasAnswered = userAnswers.length === currentQuestion + 1
  const isOnLastQuestion = currentQuestion === TOTAL_QUESTIONS - 1

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(questions)
    setCurrentQuestion(0)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const { currentTarget: { value: selectedValue } } = e
      const isCorrect = questions[currentQuestion].correct_answer === selectedValue
      const userAnswer: Answer = {
        answer: selectedValue,
        correct: isCorrect,
        correctAnswer: questions[currentQuestion].correct_answer,
        question: questions[currentQuestion].question,
      }

      if (isCorrect) setScore(prev => prev + 1)

      setUserAnswers(prev => [...prev, userAnswer])
    }
  }

  const nextQuestion = () => setCurrentQuestion(prev => prev + 1)

  useEffect(() => {
    if (userAnswers.length === TOTAL_QUESTIONS && hasAnswered) setGameOver(true)
  }, [userAnswers.length, hasAnswered])

  return (
    <div className="App">
      <h1>Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && <button className="start" onClick={startTrivia}>Start</button>}
      <p className="score">Score: {score}</p>
      {loading && <p>Loading questions...</p>}
      {!loading && !gameOver && <QuestionCard
        questionNum={currentQuestion + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[currentQuestion]?.question}
        answers={questions[currentQuestion]?.answers}
        userAnswer={userAnswers[currentQuestion]}
        callback={checkAnswer}
      />}
      {!gameOver && !loading && hasAnswered && !isOnLastQuestion && <button className='next' onClick={nextQuestion}>Next question</button>}

    </div >
  )
}

export default App
