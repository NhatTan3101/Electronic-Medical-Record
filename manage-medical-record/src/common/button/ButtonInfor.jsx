import React from "react";
import { Button } from "@mui/material";

const ButtonInfor = ({ children, type, disabled, onClick, fullWidth }) => {
  return (
    <Button fullWidth={fullWidth} variant="contained" onClick={onClick} disabled={disabled} type={type}>
      {children}
    </Button>
  );
};

export default ButtonInfor;
