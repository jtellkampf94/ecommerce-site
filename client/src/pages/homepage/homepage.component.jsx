import React, { useState } from "react";

import HighlightedContent from "../../components/highlighted-content/highlighted-content.component";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>I am the home page</h1>
      <HighlightedContent />
    </div>
  );
};

export default HomePage;
