import React from 'react';

import { useFloorNavContext } from '../../context/FloorNavContext/useFloorNavContext';
import { useViewContext } from '../../context/ViewContext/useViewContext';

import './styles.css';

export const LeftBar: React.FC = () => {
  const { floorNav, setFloorNav } = useFloorNavContext();
  const { setView } = useViewContext();

  return (
    <div className='left-wrapper'>
      <div className='bar-theme'>
        <div className='button'>
          <img
            src='/assets/icons/doxel.svg'
            alt='share-icon'
            width='60px'
            height='60px'
          ></img>
        </div>
        <div className='button' onClick={() => setFloorNav(!floorNav)}>
          <img src='/assets/icons/switch.svg' alt='switch-icon'></img>
        </div>
        <div className='button' onClick={() => setView('blueprint-view')}>
          <img src='/assets/icons/floor.svg' alt='floor-icon'></img>
        </div>
        <div className='button' onClick={() => setView('single-pano')}>
          <img src='/assets/icons/square.svg' alt='square-icon'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/dual.svg' alt='split-screen-icon'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/bim.svg' alt='bim-icon'></img>
        </div>
      </div>
    </div>
  );
};
