import React from 'react';
import { useDatePickerContext } from '../../context/DatePickerContext/useDatePickerContext';

import { PanoDatePicker } from '../DatePicker/DatePicker';
import './styles.css';

export const CalenderPicker: React.FC = () => {
  const { datePicker, setDatePicker } = useDatePickerContext();
  return (
    <>
      <PanoDatePicker />
      <div className='bar-theme calender-picker'>
        <div>
          <img src='assets/icons/left.svg' alt='left-arrow'/>
        </div>
        <div onClick={() => setDatePicker(!datePicker)}>Feb 1 2021</div>
        <div>
          <img src='assets/icons/right.svg' alt='right-arrow'/>
        </div>
      </div>
    </>
  );
};
