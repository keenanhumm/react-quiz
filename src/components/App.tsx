import React, { useState, useEffect } from 'react'

// local components
import QuestionCard from './QuestionCard'

// api
import { fetchQuestions } from '../api'

// model
import { Difficulty } from '../model/enums'
import { TOTAL_QUESTIONS } from '../model/constants'
import { Answer, EnrichedQuestion } from '../model/types'

// styles
import { GlobalStyle, Wrapper } from '../styles/App.styles'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<EnrichedQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [quizInProgress, setQuizInProgress] = useState(false)

  // derived state
  const hasAnswered = userAnswers.length === currentQuestion + 1
  const isOnLastQuestion = currentQuestion === TOTAL_QUESTIONS - 1

  const startTrivia = async () => {
    setLoading(true)
    setQuizInProgress(true)
    setGameOver(false)

    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(questions)
    setCurrentQuestion(0)
    setUserAnswers([])
    setScore(0)
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

  useEffect(() => {
    if (userAnswers.length === TOTAL_QUESTIONS && hasAnswered) {
      setGameOver(true)
      setQuizInProgress(false)
    }
  }, [userAnswers.length, hasAnswered])

  return (
    <div className="App">
      <GlobalStyle />
      <Wrapper>
        <h1>{gameOver ? 'Game over' : 'Quiz'}</h1>
        {(quizInProgress || gameOver) && <p className="score">{gameOver ? 'Final score' : 'Score'}:&nbsp;{score}</p>}
        {!quizInProgress && <button className="start-button" onClick={startTrivia}>{gameOver ? 'Play again' : 'Start'}</button>}
        {loading && <p>Loading questions...</p>}
        {!loading && (quizInProgress || gameOver) && <QuestionCard
          questionNum={currentQuestion + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[currentQuestion]?.question}
          answers={questions[currentQuestion]?.answers}
          userAnswer={userAnswers[currentQuestion]}
          callback={checkAnswer}
        />}
        {quizInProgress && !loading && !isOnLastQuestion && <button
          disabled={!hasAnswered}
          className='next-button'
          onClick={() => setCurrentQuestion(prev => prev + 1)}
        >
          Next question
        </button>}
      </Wrapper>
    </div >
  )
}

export default App
