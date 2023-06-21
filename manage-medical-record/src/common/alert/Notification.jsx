import React from "react";
import { Alert } from "@mui/material";

const Notification = ({ severity, title }) => {
  return (
    <Alert sx={{ margin: "10px 0" }} severity={severity}>
      {title}
    </Alert>
  );
};

export default Alert;
