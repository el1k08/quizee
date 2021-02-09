import React from 'react';
import classes from './Layout.module.scss'

class Layout extends React.Component {
  state = {  }
  render() { 
    return ( 
      <div className={classes.Layout}>

        <main>
          { this.props.children }
        </main>
      </div>
     );
  }
}
 
export default Layout;