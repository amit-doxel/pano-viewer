import React /*, { useCallback }*/ from 'react';

import { FloorDataType } from '../../../hooks';
import { usePanoramaContext } from '../../../context/PanoramaContext/usePanoramaContext';
import { useFloorNavContext } from '../../../context/FloorNavContext/useFloorNavContext';

import './styles.css';

export const FloorNavListItem: React.FC<FloorDataType> = (floor) => {
  const { setSceneId } = usePanoramaContext();
  const { setFloorNav } = useFloorNavContext();

  return (
    <div
      className='nav-item'
      onClick={() => {
        setSceneId(floor.sceneId);
        setFloorNav(false);
      }}
    >
      {floor.floor_name}
    </div>
  );
};
