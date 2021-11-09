import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export const Arrow: React.FC = () => {
  const { selectNextPanorama, selectPrevPanorama } = usePanoramaContext();

  return (
    <div className='arrow-wrapper'>
      <div className='arrow-theme'>
        <div onClick={() => selectPrevPanorama()}>
          <img src='/assets/icons/left-arrow.svg' alt='arrow-icon'></img>
        </div>
        <div className='mid-space'></div>
        <div onClick={() => selectNextPanorama()}>
          <img src='/assets/icons/right-arrow.svg' alt='arrow-icon'></img>
        </div>
      </div>
    </div>
  );
};
