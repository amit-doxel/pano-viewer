import React, { useCallback } from 'react';

import { FloorDataType } from '../../../hooks';
import { useCurrentFloorSceneContext } from '../../../context/CurrentFloorSceneContext/useCurrentFloorSceneContext';
import './styles.css';

export const FloorNavListItem: React.FC<FloorDataType> = (floor) => {
  const { setCurrentFloor, setCurrentScene } = useCurrentFloorSceneContext();
  const changeFloorAndScene = useCallback(
    (floor_name: string) => {
      setCurrentFloor(floor_name);
      setCurrentScene('pano_image/first_image.jpeg');
    },
    [setCurrentFloor, setCurrentScene],
  );
  return (
    <div
      className={floor.scenes === 0 ? 'disabled-nav-item' : 'nav-item'}
      onClick={() => changeFloorAndScene(floor.floor_name)}
    >
      {floor.floor_name}
    </div>
  );
};
