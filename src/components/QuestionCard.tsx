import React from 'react'
import { Answer } from '../model/types'

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: Answer;
  questionNum: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <div>
      <p className="number">Question {questionNum}/{totalQuestions}</p>
      <p className="question" dangerouslySetInnerHTML={{
        __html: question,
      }} />
      <div>
        {answers.map(answer => <div key={answer}>
          <button value={answer} disabled={!!userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{
              __html: answer,
            }} />
          </button>
        </div>)}
      </div>
    </div>
  )
}

export default QuestionCard
