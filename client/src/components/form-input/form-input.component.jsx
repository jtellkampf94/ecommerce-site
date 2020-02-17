import React from "react";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      {label ? (
        <label className="form-input-label">{label.toUpperCase()}</label>
      ) : null}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
