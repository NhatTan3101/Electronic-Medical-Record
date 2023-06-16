import * as React from "react";
import classes from './Popover.module.scss';

export default function Popover(props) {
  const { renderContainer, content, open } = props;

  return (
    <div className={classes.popover}>
      {renderContainer({ open, close })}
      {open && <div className={classes.content}>{content}</div>}
    </div>
  );
}
