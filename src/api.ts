// model
import { Difficulty } from "./model/enums"
import { Question } from "./model/types"

// utils
import { shuffle } from "./utils"

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty&type=multiple`
  const data = await (await fetch(endpoint)).json()

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffle([...question.incorrect_answers, question.correct_answer]),
  }))
}