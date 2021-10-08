import React from 'react';

import './styles.css';

export const ZoomBar: React.FC = () => {
  return (
    <div className='zoom-wrapper'>
      <div className='bottom-bar zoom-bar'>
        <div className='button'>
          <img src='assets/icons/minus.svg' />
        </div>
        <div className='button'>
          <img src='/assets/icons/Add.svg'></img>
        </div>
      </div>
    </div>
  );
};
