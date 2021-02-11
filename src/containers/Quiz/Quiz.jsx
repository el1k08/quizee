import React from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import QuizService from '../../Services/QuizService'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends React.Component {
  
  state = { 
    loading: true,
    results: {},
    ifFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Розовый', id: 2},
          {text: 'Синий', id: 3},
          {text: 'Зеленый', id: 4},
        ]
      },
      {
        question: 'Какого цвета трава?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Розовый', id: 2},
          {text: 'Синий', id: 3},
          {text: 'Зеленый', id: 4},
        ]
      }
    ]
   }

  onAnswerClickHandler = answerId => {

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {

        if (this.isQuizFinished()) {
          
          this.setState({
            ifFinished: true
          })

        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }

   

  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHendler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      ifFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    try {
      const { data } = await QuizService.getQuiz(this.props.match.params.id)
      this.setState({
        quiz: data,
        loading: false
      })

    }catch(e){
      console.log(e)
    }
  }

  render() { 
    return ( 
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          { this.state.loading
              ? <Loader />
              : this.state.ifFinished 
                  ? <FinishedQuiz 
                      results={this.state.results}
                      quiz={this.state.quiz}
                      onRetry={this.retryHendler}
                    />
                  : <ActiveQuiz 
                      answers={this.state.quiz[this.state.activeQuestion].answers}
                      question={this.state.quiz[this.state.activeQuestion].question}
                      onAnswerClick={this.onAnswerClickHandler}
                      quizLength={this.state.quiz.length}
                      answerNumber={this.state.activeQuestion + 1}
                      state={this.state.answerState}
                    />
          }
        </div>
      </div>
     );
  }
}
 
export default Quiz;