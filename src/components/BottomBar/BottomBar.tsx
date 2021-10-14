import React from 'react';

import { ZoomBar } from '../ZoomBar';
import './styles.css';

interface Props {
  changeViewTo: (view: string) => void;
}

export const BottomBar: React.FC<Props> = ({ changeViewTo }) => {
  return (
    <div className='bottom-wrapper'>
      <div className='bar-theme'>
        <div className='button' onClick={() => changeViewTo('single-pano')}>
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
