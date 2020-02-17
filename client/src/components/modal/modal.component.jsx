import React from "react";
import ReactDOM from "react-dom";

import "./modal.styles.css";

const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div className="modal-container" onClick={onDismiss}>
      <div onClick={e => e.stopPropagation()} className="modal">
        <h1 className="modal-header">{title}</h1>
        <div className="modal-content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
