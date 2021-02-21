import QuizService from '../../Services/QuizService'
import { 
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZ_SUCCESS, 
  QUIZ_SET_STATE, 
  FINITH_QUIZ, 
  QUIZ_NEXT_QUESTION,
  QUIZE_RETRY 
} from './actionType'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const { data } = await QuizService.getAllQuizes()
      const quizes = []
      Object.keys(data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест № ${index + 1}`
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch(e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const { data } = await QuizService.getQuiz(quizId)
      dispatch(fetchQuizSuccess(data))
    }catch(e){
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
   type: FETCH_QUIZES_START
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
   }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
   }
}


export function quizeSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz() {
  return {
    type: FINITH_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function retryQuiz() {
  return {
    type: QUIZE_RETRY
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {

    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizeSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {

        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(quizeSetState({[answerId]: 'error'}, results))
    }

  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

