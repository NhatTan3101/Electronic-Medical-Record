import React from 'react'
import classes from './ButtonInfor.module.scss'

const ButtonInfor = ({children}) => {
  return (
    <button className={classes.container}>{children}</button>
  )
}

export default ButtonInfor