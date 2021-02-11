import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.scss'
import QuizService from '../../Services/QuizService'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends React.Component {
  state = { 
    quizes: [],
    loading: true
   }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const { data } = await QuizService.getAllQuizes()
      const quizes = []
      Object.keys(data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест № ${index + 1}`
        })
      })

      this.setState({quizes, loading: false})
    } catch(e) {
      console.log(e)
    }
    
  }

  render() { 
    return ( 
      <div className={classes.QuizList}>
        <div>
          <h1>Список Тестов</h1>
          { this.state.loading 
              ? <Loader /> 
              : <ul>
                  { this.renderQuizes()  }
                </ul>
          }
          
        </div>
      </div>
     );
  }
}
 
export default QuizList;