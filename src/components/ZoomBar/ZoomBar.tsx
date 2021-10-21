import React from 'react';

import { BottomBarProp } from '../BottomBar';
import './styles.css';

export const ZoomBar: React.FC<BottomBarProp> = ({ zoomIn, zoomOut }) => {
  return (
    <div className='zoom-wrapper'>
      <div className='bar-theme zoom-bar'>
        <div className='button' onClick={zoomOut}>
          <img src='assets/icons/minus.svg' alt='zoom-out-icon' />
        </div>
        <div className='button' onClick={zoomIn}>
          <img src='/assets/icons/add.svg' alt='zoom-in-icon' />
        </div>
      </div>
    </div>
  );
};
