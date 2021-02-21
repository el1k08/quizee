import QuizService from '../../Services/QuizService'
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionType'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuize() {
  return async (dispatch, getState) => {
    await QuizService.createQuiz(getState().create.quiz)
    dispatch(resetQuizCreation())
  }
}