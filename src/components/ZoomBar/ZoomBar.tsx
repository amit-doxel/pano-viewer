import React from 'react';

import './styles.css';

export const ZoomBar: React.FC = () => {
  return (
    <div className='zoom-wrapper'>
      <div className='bar-theme zoom-bar'>
        <div className='button' id='zoom-out'>
          <img src='assets/icons/minus.svg' alt='zoom-out-icon' />
        </div>
        <div className='button' id='zoom-in'>
          <img src='/assets/icons/add.svg' alt='zoom-in-icon'></img>
        </div>
      </div>
    </div>
  );
};
