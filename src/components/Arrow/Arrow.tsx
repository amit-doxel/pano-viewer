import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export const Arrow: React.FC = () => {
  const { currentScene, setCurrentScene } = usePanoramaContext();
  const changeScene = () => {
    if (currentScene === 'pano-image/R0140118.JPG') {
      setCurrentScene('pano-image/R0140102.JPG');
    } else {
      setCurrentScene('pano-image/R0140118.JPG');
    }
  };
  return (
    <div className='arrow-wrapper'>
      <div className='arrow-theme'>
        <div onClick={() => changeScene()}>
          <img src='/assets/icons/left-arrow.svg' alt='arrow-icon'></img>
        </div>
        <div onClick={() => changeScene()}>
          <img src='/assets/icons/right-arrow.svg' alt='arrow-icon'></img>
        </div>
      </div>
    </div>
  );
};
