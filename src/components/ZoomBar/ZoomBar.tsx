import React from 'react';

import { BottomBarProp } from '../BottomBar';
import { useScene } from '../../hooks';
import './styles.css';

export const ZoomBar: React.FC<BottomBarProp> = ({ zoomIn, zoomOut }) => {
  const { camera } = useScene();
  return (
    <div className='zoom-wrapper'>
      <div className='bar-theme zoom-bar'>
        <div className='button' onClick={() => zoomOut(camera)}>
          <img src='assets/icons/minus.svg' alt='zoom-out-icon' />
        </div>
        <div className='button' onClick={() => zoomIn(camera)}>
          <img src='/assets/icons/add.svg' alt='zoom-in-icon'></img>
        </div>
      </div>
    </div>
  );
};
