import React from 'react';

import './styles.css';

export const LeftBar: React.FC = () => {
  return (
    <div className='left-wrapper'>
      <div className='bottom-bar'>
        <div className='button'>
          <img src='/assets/icons/switch.svg'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/floor.svg'></img>
        </div>
        <div className='button'>
          <img src='/assets/icons/share.svg'></img>
        </div>
      </div>
    </div>
  );
};
