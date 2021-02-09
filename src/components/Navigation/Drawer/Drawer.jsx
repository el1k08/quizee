/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

const links = [
  {to: '/', label: 'Список', exact: true},
  {to: '/auth', label: 'Авторизация', exact: false},
  {to: '/quiz-creator', label: 'Создать тест', exact: false}
]

class Drawer extends React.Component {
  state = {  }

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks() {
    return links.map((link, index) => {
      return(
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          > 
          {link.label}
          </NavLink>
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