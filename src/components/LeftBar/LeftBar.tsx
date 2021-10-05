import React from 'react';

import './styles.css';

export const LeftBar = () => {
  return (
    <div className='left-wrapper'>
      <div className='bottom-bar'>
        <div className='button'>
          {/* <ion-icon name='reorder-four-outline' size='large' role='reorder'></ion-icon> */}
        </div>
        <div className='button'>
          {/* <ion-icon name='podium-outline' size='large' role='architecture'></ion-icon> */}
        </div>
        <div className='button'>
          {/* <ion-icon name='information-circle-outline' size='large' role='info'></ion-icon> */}
        </div>
        <div className='button'>
          {/* <ion-icon name='share-social-outline' size='large' role='share'></ion-icon> */}
        </div>
      </div>
    </div>
  );
};
