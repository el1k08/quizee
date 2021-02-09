import React from 'react';
import Layout from './hoc/Layout/Layout'

import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

import { Route, Switch } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faUserTimes, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTimes, faUserTimes, faBars)

class App extends React.Component {
  state = {  }
  render() { 
    return ( 
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
        </Switch>
      </Layout>
    );
  }
}
 
export default App;