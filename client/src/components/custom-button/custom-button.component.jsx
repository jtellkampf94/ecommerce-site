import React from "react";

const CustomButton = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default CustomButton;
