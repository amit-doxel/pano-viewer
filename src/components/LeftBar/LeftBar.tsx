import React from "react";

import "./styles.css";

export const LeftBar: React.FC = () => {
  return (
    <div className="left-wrapper">
      <div className="bottom-bar">
        <div className="button">
          <img src="/assets/icons/switch.svg" alt="switch-icon"></img>
        </div>
        <div className="button">
          <img src="/assets/icons/floor.svg" alt="floor-icon"></img>
        </div>
        <div className="button">
          <img src="/assets/icons/share.svg" alt="share-icon"></img>
        </div>
      </div>
    </div>
  );
};
