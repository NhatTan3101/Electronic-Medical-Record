import * as React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { grey, blue } from "@mui/material/colors";

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-color: ${blue[400]};
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function TextArea({ placeholder, value, onChange, name }) {
  return (
    <StyledTextarea
      aria-label="empty textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}
