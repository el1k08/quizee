import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faTimes)

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