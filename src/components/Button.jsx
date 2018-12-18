import React from "react";

/* Import Style */
import '../index.scss';

const Button = props => {
  return (
    <button
      style={props.style}
      className={props.type}
      onClick={props.action}
    >
      {props.title}
    </button>
  );
};

export default Button;
