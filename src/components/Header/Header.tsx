import React from "react";

import "./styles.css";

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="doxel-icon">
        <img src="/assets/icons/doxel.svg" alt="doxel-icon"></img>
      </div>
      <div className="cross-icon">
        <img src="/assets/icons/close.svg" alt="close-icon"></img>
      </div>
    </div>
  );
};
