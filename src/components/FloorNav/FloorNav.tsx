import React from 'react';

import { useFloorNavData } from '../../hooks';
import { useFloorNavContext } from '../../context/FloorNavContext/useFloorNavContext';
import './styles.css';

export const FloorNav: React.FC = () => {
  const { floorNav } = useFloorNavContext();
  const { floorNavData } = useFloorNavData();
  const FloorList = floorNavData?.map((floor) => {
    return (
      <div className='nav-item' key={floor.id}>
        {floor.title}
      </div>
    );
  });
  if (floorNav) {
    return (
      <div className='floor-nav-wrapper'>
        <div className='bar-theme floor-nav'>{FloorList}</div>
      </div>
    );
  } else {
    return null;
  }
};
