import React from 'react';
import classes from './MenuToggle.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MenuToggle = (props) => {

  const cls = [
    classes.MenuToggle,
    props.isOpen ? classes.open : null
  ]

  return ( 
    
    <FontAwesomeIcon 
      className={cls.join(' ')}
      icon={props.isOpen ? 'times' : 'bars'}
      onClick={props.onToggle}
    />


    // <i
    //   className={cls.join(' ')}
    //   onClick={props.onToggle}
    // />

    // <FontAwesomeIcon 
    //   icon={props.isOpen ? 'times' : 'bars'} 
    //   className={
    //     classes.MenuToggle,
    //     props.isOpen ? classes.open : null
    //   } 
    //   onClick={props.onToggle} />
   );
}
 
export default MenuToggle;