import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";

const InputSelect = ({
  inputLabel,
  value,
  onChange,
  children,
  name,
  helperText,
  error,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        size="small"
        sx={{ mb: "10px" }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
