import "./WhatWeDo.css"
import React from "react";

function WhatWeDo() {
  return (
    <div className="what-we-do">
      <h2 className="section-header">What We Do ?</h2>
      <div className="wwd-container">
        <div className="img-dev">
          <img src="/src/assets/images/pngtree-man-working.png" alt="" />
        </div>
        <div>
          <p>
            We use <span>computer vision</span>
          </p>
          <p>to help you to get your own lost By sending a picture of the missing person and waiting for surveillance cameras or other people to take a picture of him then sent message to your phone </p>
        </div>
      </div>
    </div>
  );
}

export default WhatWeDo;
