import React from "react";
import classes from "./CardImage.module.scss";

const CardImage = ({ key, img, title, content }) => {
  return (
    <div key={key} className={classes.container}>
      <img src={img} />
      <div className={classes.body}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CardImage;
