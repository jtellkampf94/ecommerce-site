import React from "react";

import CustomButton from "../custom-button/custom-button.component";

const ContentItem = () => {
  return (
    <div className="content-item">
      <div className="content-item__background-image"></div>
      <div className="content-item__container">
        <span className="content-item__title">I am content</span>
        <span className="content-item__subtitle">subitle</span>
        <CustomButton>Take a look</CustomButton>
      </div>
    </div>
  );
};

export default ContentItem;
