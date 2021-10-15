import React from 'react';

import { FloorDataType } from '../../../hooks';
import { useCurrentFloorSceneContext } from '../../../context/CurrentFloorSceneContext/useCurrentFloorSceneContext';
import { useFloorNavContext } from '../../../context/FloorNavContext/useFloorNavContext';

import './styles.css';

export const FloorNavListItem: React.FC<FloorDataType> = (floor) => {
  const { currentScene, setCurrentFloor, setCurrentScene } =
    useCurrentFloorSceneContext();

  const { floorNav, setFloorNav } = useFloorNavContext();

  const changeFloorAndScene = (floor_name: string) => {
    setCurrentFloor(floor_name);
    if (currentScene === 'pano_image/first_image.jpeg') {
      setCurrentScene('pano_image/second_image.jpg');
    } else {
      setCurrentScene('pano_image/first_image.jpeg');
    }
    setFloorNav(!floorNav);
  };

  return (
    <div
      className={floor.scenes === 0 ? 'disabled-nav-item' : 'nav-item'}
      onClick={
        floor.scenes !== 0
          ? () => changeFloorAndScene(floor.floor_name)
          : undefined
      }
    >
      {floor.floor_name}
    </div>
  );
};
