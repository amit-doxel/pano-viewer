import React from 'react';

import { useDatePickerContext } from '../../context/DatePickerContext/useDatePickerContext';
import { PanoDatePicker } from '../DatePicker/DatePicker';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';

import './styles.css';

export const CalenderPicker: React.FC = () => {
  const { datePicker, setDatePicker } = useDatePickerContext();

  const { selectedFloor, selectedDateStr, setSelectedDateStr } =
    usePanoramaContext();

  const scans = (selectedFloor && selectedFloor.scans) || [];
  const scanDates = scans.map(({ date }) => date);

  function onLeftArrowClick() {
    if (!selectedDateStr || !scanDates.length) {
      return;
    }
    const idx = scanDates.indexOf(selectedDateStr);

    const nextIdx = idx - 1 >= 0 ? idx - 1 : scanDates.length - 1;
    setSelectedDateStr(scanDates[nextIdx]);
  }

  function onRightArrowClick() {
    if (!selectedDateStr || !scanDates.length) {
      return;
    }
    const idx = scanDates.indexOf(selectedDateStr);
    const nextIdx = idx + 1 < scanDates.length ? idx + 1 : 0;
    setSelectedDateStr(scanDates[nextIdx]);
  }

  return (
    <>
      <PanoDatePicker />
      <div className='bar-theme calender-picker'>
        <div>
          <img
            onClick={onLeftArrowClick}
            src='assets/icons/left.svg'
            alt='left-arrow'
          />
        </div>
        <div onClick={() => setDatePicker(!datePicker)}>{selectedDateStr}</div>
        <div>
          <img
            onClick={onRightArrowClick}
            src='assets/icons/right.svg'
            alt='right-arrow'
          />
        </div>
      </div>
    </>
  );
};
