import React from 'react';

import './styles.css';

export const ZoomBar: React.FC = () => {
  return (
    <div className='zoom-wrapper'>
      <div className='bottom-bar zoom-bar'>
        <div className='button'>
          {/* <ion-icon name='remove-outline' size='large' role='zoom-in'></ion-icon> */}
        </div>
        <div className='button'>
          {/* <ion-icon name='add-outline' size='large' role='zoom-in'></ion-icon> */}
        </div>
      </div>
    </div>
  );
};
