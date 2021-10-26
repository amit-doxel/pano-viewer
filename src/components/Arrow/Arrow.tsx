import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export const Arrow: React.FC = () => {
  const { setCurrentScene } = usePanoramaContext();
  return (
    <div className='arrow-wrapper'>
      <div className='arrow-theme'>
        <div onClick={() => setCurrentScene('pano-image/R0140118.JPG')}>
          <img src='/assets/icons/left-arrow.svg' alt='arrow-icon'></img>
        </div>
        <div onClick={() => setCurrentScene('pano-image/R0140102.JPG')}>
          <img src='/assets/icons/right-arrow.svg' alt='arrow-icon'></img>
        </div>
      </div>
    </div>
  );
};
