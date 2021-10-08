import React from 'react';

import './styles.css';
import { ZoomBar } from '../ZoomBar/ZoomBar';

export const BottomBar: React.FC = () => {
  return (
    <div className='bottom-wrapper'>
      <div className='bottom-bar'>
        <div className='button'>
          <img src='/assets/icons/square.svg'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/dual.svg'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/bim.svg'></img>
        </div>
      </div>
      <ZoomBar></ZoomBar>
    </div>
  );
};
