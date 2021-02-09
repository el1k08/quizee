import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faUserTimes, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTimes, faUserTimes, faBars)

class App extends React.Component {
  state = {  }
  render() { 
    return ( 
      <Layout>
        <Quiz/>
      </Layout>
    );
  }
}
 
export default App;