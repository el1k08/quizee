/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [1, 2 , 3]

class Drawer extends React.Component {
  state = {  }


  renderLinks() {
    return links.map((link, index) => {
      return(
        <li key={index}>
          <a> Link {link} </a>
        </li>
      )
    })
  }

  render() { 

    const cls = [
      classes.Drawer,
      !this.props.isOpen ? classes.close : null
    ]

    return (<> 
      <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks() }
        </ul>
      </nav>
      { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null } 
     </>);
  }
}
 
export default Drawer;