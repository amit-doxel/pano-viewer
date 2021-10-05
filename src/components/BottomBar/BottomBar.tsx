import React from 'react';

import './styles.css';

export const BottomBar: React.FC = () => {
  return (
    <div className='bottom-wrapper'>
      <div className='bottom-bar'>
        <div className='button'>
          {/* <ion-icon name='square-outline' size='large' role='stop'></ion-icon> */}
        </div>
        <div className='button'>
          {/* <ion-icon name='pause-outline' size='large' role='split'></ion-icon> */}
        </div>
        <div className='button'>
          {/* <ion-icon name='cube-outline' size='large' role='cube'></ion-icon> */}
        </div>
      </div>
    </div>
  );
};
