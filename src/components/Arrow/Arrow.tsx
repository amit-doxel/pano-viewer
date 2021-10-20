import React from 'react';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import './styles.css';

export interface ArrowProp {
  style: object;
  url: string;
}

export const Arrow: React.FC<ArrowProp> = ({ style, url }) => {
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
        top: '55%',
        ...style,
      }}
    >
      <div className='arrow-theme' onClick={() => changeFloorAndScene()}>
        <img src={url} alt='arrow-icon'></img>
      </div>
    </div>
  );
};
