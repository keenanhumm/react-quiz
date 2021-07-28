import React from 'react'

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: boolean;
  questionNum: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions
}) => {
  return (
    <div>
      <p className="number">Question {questionNum} of {totalQuestions}:</p>
      <p className="question">{question}</p>
      <div>
        {answers.map(answer => <div>
          <button disabled={userAnswer} onClick={callback}>
            <span>{answer}</span>
          </button>
        </div>)}
      </div>
    </div>
  )
}

export default QuestionCard
