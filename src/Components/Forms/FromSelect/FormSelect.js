import React from "react";

const FormSelect = ({ handleChange, label, options, ...otherProps }) => {
  return (
    <div className="form-row">
      {label && <label>{label}</label>}
      <select className="formInput" onChange={handleChange} {...otherProps}>
        {options.map((option, i) => {
          const { value, name } = option;
          return (
            <option key={i} value={value} name={name}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
