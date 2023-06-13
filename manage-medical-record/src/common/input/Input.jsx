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
        sx={{
          "& .MuiInputBase-root": {
            "& .MuiInputBase-input": {
              height: "10px",
              backgroundColor: "#fff",
              borderRadius: "4px",
            },
          },
          margin: "10px 0px",
        }}
      />
  );
};

export default Input;
