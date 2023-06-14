import * as React from "react";
import Popover from "@mui/material/Popover";
import classes from './Popover.module.scss';

export default function BasicPopover(props) {
  const { renderContainer, content, open } = props;

  return (
    <div className={classes.popover}>
      {renderContainer({ open, close })}
      {open && <div className={classes.content}>{content}</div>}
    </div>
  );
}
