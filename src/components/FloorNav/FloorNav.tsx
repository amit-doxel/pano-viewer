import React from 'react';

import { FloorNavList } from './FloorNavList';
import { useFloorNavContext } from '../../context/FloorNavContext/useFloorNavContext';
import './styles.css';

export const FloorNav: React.FC = () => {
  const { floorNav } = useFloorNavContext();
  return (
    <>
      {floorNav && (
        <div className='floor-nav-wrapper'>
          <div className='bar-theme floor-nav'>
            <FloorNavList />
          </div>
        </div>
      )}
    </>
  );
};
