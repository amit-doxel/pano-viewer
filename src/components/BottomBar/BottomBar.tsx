import React from 'react';
import { useViewContext } from '../../context/ViewContext/useViewContext';

import { ZoomBar } from '../ZoomBar';
import './styles.css';

export const BottomBar: React.FC = () => {
  const { setView } = useViewContext();
  return (
    <div className='bottom-wrapper'>
      <div className='bar-theme'>
        <div className='button' onClick={() => setView('single-pano')}>
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
