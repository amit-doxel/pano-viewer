import React /*, { useCallback }*/ from 'react';

import { FloorDataType } from '../../../hooks';
import { usePanoramaContext } from '../../../context/PanoramaContext/usePanoramaContext';
import { useFloorNavContext } from '../../../context/FloorNavContext/useFloorNavContext';

import './styles.css';

export const FloorNavListItem: React.FC<FloorDataType> = (floor) => {
  const { setFloorNav } = useFloorNavContext();

  const { currentScene, setCurrentScene } = usePanoramaContext();
  const changeScene = () => {
    if (currentScene === 'pano-image/R0140118.JPG') {
      setCurrentScene('pano-image/R0140102.JPG');
      setFloorNav(false);
    } else {
      setCurrentScene('pano-image/R0140118.JPG');
      setFloorNav(false);
    }
  };

  return (
    <div
      className={floor.scenes === 0 ? 'disabled-nav-item' : 'floor-nav-item'}
      onClick={() => changeScene()}
    >
      {floor.floor_name}
    </div>
  );
};
