import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const InputSelect = ({ inputLabel, value, onChange, children, name }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        name={name}
        value={value}
        label="Age"
        onChange={onChange}
        // sx={{
        //   "& .MuiInputBase-root": {
        //     height: "43px",
        //     backgroundColor: "#fff",
        //   },
        // }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
