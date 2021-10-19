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
        <div className='button' onClick={() => setFloorNav(!floorNav)}>
          <img src='/assets/icons/switch.svg' alt='switch-icon'></img>
        </div>
        <div className='button' onClick={() => setView('blueprint-view')}>
          <img src='/assets/icons/floor.svg' alt='floor-icon'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/share.svg' alt='share-icon'></img>
        </div>
      </div>
    </div>
  );
};
