import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export const Arrow: React.FC = () => {
  const { setSceneId } = usePanoramaContext();
  return (
    <div className='arrow-wrapper'>
      <div className='arrow-theme'>
        <div onClick={() => setSceneId(387600)}>
          <img src='/assets/icons/left-arrow.svg' alt='arrow-icon'></img>
        </div>
        <div onClick={() => setSceneId(387679)}>
          <img src='/assets/icons/right-arrow.svg' alt='arrow-icon'></img>
        </div>
      </div>
    </div>
  );
};
