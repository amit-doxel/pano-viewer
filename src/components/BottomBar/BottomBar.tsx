import React from 'react';

import './styles.css';
import { ZoomBar } from '../ZoomBar/ZoomBar';

export const BottomBar: React.FC = () => {
  return (
    <div className='bottom-wrapper'>
      <div className='bar-theme'>
        <div className='button'>
          <img src='/assets/icons/square.svg' alt='square-icon'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/dual.svg' alt='split-screen-icon'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/bim.svg' alt='bim-icon'></img>
        </div>
      </div>
      <ZoomBar></ZoomBar>
    </div>
  );
};
