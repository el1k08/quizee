import React from 'react';
import Layout from './hoc/Layout/Layout'

class App extends React.Component {
  state = {  }
  render() { 
    return ( 
      <Layout>
        <div style={{width: 400, border: '1px solid black'}}>
          <h1>Layout work!</h1>
        </div>
      </Layout>
    );
  }
}
 
export default App;