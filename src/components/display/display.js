import React from "react";

import "./display.moudle.css";

const Display = ({ name }) => {
  return (
    <div className="display_continer">
      <p className="head">Hello! {name}</p>
      <p className="message">
        “A room without books is like a body without a soul.”
      </p>
    </div>
  );
};

export default Display;
