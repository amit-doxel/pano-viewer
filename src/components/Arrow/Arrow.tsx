import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export const Arrow: React.FC = () => {
  const { currentScene, setCurrentScene } = usePanoramaContext();

  const changeFloorAndScene = () => {
    if (currentScene === 'pano_image/first_image.jpeg') {
      setCurrentScene('pano_image/second_image.jpg');
    } else {
      setCurrentScene('pano_image/first_image.jpeg');
    }
  };

  return (
    <div className='arrow-wrapper'>
      <div className='arrow-theme'>
        <div onClick={() => changeFloorAndScene()}>
          <img src='/assets/icons/left-arrow.svg' alt='arrow-icon'></img>
        </div>
        <div onClick={() => changeFloorAndScene()}>
          <img src='/assets/icons/right-arrow.svg' alt='arrow-icon'></img>
        </div>
      </div>
    </div>
  );
};
