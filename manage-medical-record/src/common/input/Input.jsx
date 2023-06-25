import { TextField } from "@mui/material";
import React from "react";

const Input = ({
  name,
  value,
  defaultValue,
  type,
  onChange,
  onBlur,
  fullWidth,
  label,
  helperText,
  error,
  InputLabelProps,
}) => {
  return (
    <TextField
      name={name}
      value={value}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth={fullWidth}
      label={label}
      variant="outlined"
      error={error}
      helperText={helperText}
      size="small"
      sx={{mb: '10px'}}
      InputLabelProps={InputLabelProps}
    />
  );
};

export default Input;
