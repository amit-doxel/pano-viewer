import React from 'react';

import './styles.css';

export const CalenderPicker: React.FC = () => {
  return (
    <div className='bar-theme calender-picker'>
      <img src='assets/icons/left.svg'/>
        <span>Feb 1 2021</span>
      <img src='assets/icons/right.svg'/>
    </div>
  );
};
