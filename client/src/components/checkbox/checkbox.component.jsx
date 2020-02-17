import React from "react";

const Checkbox = ({ name, value, handleChange, state }) => {
  const option = value.charAt(0).toUpperCase() + value.slice(1);
  const checked = state[name] ? state[name].includes(value) : false;
  return (
    <React.Fragment>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      {option}
    </React.Fragment>
  );
};

export default Checkbox;
