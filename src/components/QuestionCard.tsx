import React from 'react'

// model
import { Answer } from '../model/types'

// styles
import { Wrapper, ButtonWrapper } from '../styles/QuestionCard.styles'

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
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
}) => (
  <Wrapper>
    <p className="number">Question {questionNum}/{totalQuestions}</p>
    <p className="question" dangerouslySetInnerHTML={{
      __html: question,
    }} />
    <div>
      {answers.map(answer => <ButtonWrapper
        isCorrect={!!userAnswer && userAnswer.correctAnswer === answer}
        isClicked={!!userAnswer && userAnswer.answer === answer}
        key={answer}
      >
        <button disabled={!!userAnswer} value={answer} onClick={callback}>
          <span dangerouslySetInnerHTML={{
            __html: answer,
          }} />
        </button>
      </ButtonWrapper>)}
    </div>
  </Wrapper>
)

export default QuestionCard
