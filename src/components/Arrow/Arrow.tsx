import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export interface ArrowProp {
  leftPos: string;
  url: string;
}

export const Arrow: React.FC<ArrowProp> = ({ leftPos, url }) => {
  const { currentScene, setCurrentScene } = usePanoramaContext();

  const changeFloorAndScene = () => {
    if (currentScene === 'pano_image/first_image.jpeg') {
      setCurrentScene('pano_image/second_image.jpg');
    } else {
      setCurrentScene('pano_image/first_image.jpeg');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: `${leftPos}`,
        top: '53%',
        textAlign: 'center',
      }}
    >
      <div className='arrow-theme' onClick={() => changeFloorAndScene()}>
        <img src={url} alt='arrow-icon'></img>
      </div>
    </div>
  );
};
