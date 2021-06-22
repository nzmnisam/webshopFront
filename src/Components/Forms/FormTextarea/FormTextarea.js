import React from "react";
import "./FormTextarea.css";

const FormTextarea = ({ onChange, label, ...otherProps }) => {
  return (
    <div className="form-row">
      {label && <label>{label}</label>}
      <textarea
        className="formTextarea"
        onChange={onChange}
        label={label}
        {...otherProps}
      ></textarea>
    </div>
  );
};

export default FormTextarea;
