import React from "react";
import "./Button.css";

const CLASSES = [
  "btn--primary",
  "btn--secondary",
  "btn--outline",
  "btn--signin",
  "btn--signin--admin",
  "btn--add--to--cart",
];

const SIZES = ["btn--medium", "btn--large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkButtonClass = CLASSES.includes(buttonStyle)
    ? buttonStyle
    : CLASSES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonClass} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
