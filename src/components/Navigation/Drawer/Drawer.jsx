/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'



class Drawer extends React.Component {
  state = {  }

  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
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

    const links = [
      {to: '/', label: 'Список', exact: true}
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (<> 
      <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks(links) }
        </ul>
      </nav>
      { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null } 
     </>);
  }
}
 
export default Drawer;