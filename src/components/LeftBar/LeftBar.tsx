import React from 'react';

import './styles.css';

interface Props {
  onViewSelected: (view: string) => void
}

export const LeftBar: React.FC<Props> = ({onViewSelected}) => {
  return (
    <div className='left-wrapper'>
      <div className='bottom-bar'>
        <div onClick={() => onViewSelected('single-pano')} className='button'>
          <img src='/assets/icons/switch.svg' alt='switch-icon'></img>
        </div>
        <div onClick={() => onViewSelected('floorplan')} className='button'>
          <img src='/assets/icons/floor.svg' alt='floor-icon'></img>
        </div>
        {
        /*<div className='button'>
          <img src='/assets/icons/share.svg' alt='share-icon'></img>
        </div>*/
        }
      </div>
    </div>
  );
};
