import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <b>{message}</b>
    </div>
  );
};

export default ErrorMessage;
