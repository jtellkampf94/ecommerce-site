import React from "react";
import Checkbox from "../checkbox/checkbox.component";
import uuid from "uuid/v1";

const CheckboxSection = ({
  title,
  text,
  handleChange,
  state,
  name,
  values
}) => {
  return (
    <div className="group">
      <label htmlFor="category">{title}</label>
      {text && <small>{text}</small>}
      {values.map(value => (
        <Checkbox
          key={uuid()}
          name={name}
          state={state}
          value={value}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default CheckboxSection;
