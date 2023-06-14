import { TextField } from "@mui/material";
import React from "react";

const Input = ({
  name,
  value,
  defaultValue,
  type,
  onChange,
  onBlur,
  label,
  helperText,
  error,
}) => {
  return (
    <TextField
      name={name}
      value={value}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      label={label}
      variant="outlined"
      error={error}
      helperText={helperText}
      size="small"
      sx={{mb: '10px'}}
    />
  );
};

export default Input;
