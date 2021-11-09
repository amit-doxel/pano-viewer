import React, { useMemo, useCallback } from 'react';

import { useDatePickerContext } from '../../context/DatePickerContext/useDatePickerContext';
import { PanoDatePicker } from '../DatePicker/DatePicker';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import { useViewContext } from '../../context/ViewContext/useViewContext';
import { View } from '../../context/ViewContext/models';

import './styles.css';

export const CalenderPicker: React.FC = () => {
  const { datePicker, setDatePicker } = useDatePickerContext();

  const { selectedFloor, gridPanoramas, selectedDateStr, onDateChange } =
    usePanoramaContext();

  const { view } = useViewContext();

  const availableDates = useMemo(() => {
    if (View.SINGLE_PANO === view) {
      return gridPanoramas.map(({ scanDate }) => scanDate);
    } else if (View.FLOORPLAN === view) {
      return (selectedFloor && selectedFloor.scans) || ([] as string[]);
    } else {
      return [];
    }
  }, [view, gridPanoramas, selectedFloor]);

  function onLeftArrowClick() {
    if (!selectedDateStr || !availableDates.length) {
      return;
    }
    const idx = availableDates.indexOf(selectedDateStr);

    const nextIdx = idx - 1 >= 0 ? idx - 1 : availableDates.length - 1;
    onDateChange(availableDates[nextIdx]);
  }

  function onRightArrowClick() {
    if (!selectedDateStr || !availableDates.length) {
      return;
    }
    const idx = availableDates.indexOf(selectedDateStr);
    const nextIdx = idx + 1 < availableDates.length ? idx + 1 : 0;
    onDateChange(availableDates[nextIdx]);
  }

  const selectedDate =
    selectedDateStr && getDateWithUTCOffset(new Date(selectedDateStr));

  const minMaxDate = useMemo(
    () =>
      getPanosMinMaxDate(availableDates).map(getDateWithUTCOffset) as [
        Date,
        Date,
      ],
    [availableDates],
  );

  const dateToIsEnabledMap = useMemo(() => {
    return availableDates.reduce((map, date) => {
      map[date] = true;
      return map;
    }, {} as { [key: string]: boolean });
  }, [availableDates]);

  const onChange = useCallback(
    function (date: Date) {
      if (View.SINGLE_PANO === view) {
        const dateStr = getDateStr(date);
        const panorama = gridPanoramas.find(
          ({ scanDate }) => scanDate === dateStr,
        );
        onDateChange(dateStr, panorama);
      } else {
        onDateChange(getDateStr(date));
      }

      setDatePicker(false);
    },
    [setDatePicker, gridPanoramas, view, onDateChange],
  );

  const canRenderDatePicker = datePicker && selectedDate instanceof Date;

  return (
    <>
      {canRenderDatePicker && (
        <PanoDatePicker
          minMaxDate={minMaxDate}
          dateToIsEnabledMap={dateToIsEnabledMap}
          selectedDate={selectedDate}
          onChange={onChange}
        />
      )}
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

function getPanosMinMaxDate(dateStrings: string[]): [Date, Date] | [] {
  if (!dateStrings.length) {
    return [];
  }
  const minMaxDateTimestamp = dateStrings.reduce(
    (minMaxSoFar, dateStr) => {
      return [
        Math.min(minMaxSoFar[0], +new Date(dateStr)),
        Math.max(minMaxSoFar[1], +new Date(dateStr)),
      ];
    },
    [Infinity, -Infinity],
  );

  return [new Date(minMaxDateTimestamp[0]), new Date(minMaxDateTimestamp[1])];
}

function getDateWithUTCOffset(date: Date): Date {
  const offset = date.getTimezoneOffset();
  const newDate = new Date();
  newDate.setTime(+date + offset * 60000);
  return newDate;
}

function getDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}
