import React from "react";
import classes from "./ButtonInfor.module.scss";

const ButtonInfor = ({ children, type, disabled }) => {
  return (
    <button disabled={disabled} type={type} className={classes.container}>
      {children}
    </button>
  );
};

export default ButtonInfor;
