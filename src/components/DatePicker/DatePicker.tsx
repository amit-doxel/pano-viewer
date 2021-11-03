import React, { useEffect, useMemo } from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core/styles';

import { useDatePickerContext } from '../../context/DatePickerContext/useDatePickerContext';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import { Panorama } from '../../models/panorama';

import './styles.css';

export function PanoDatePicker() {
  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ff8000',
      },
    },
  });

  const { datePicker, setDatePicker } = useDatePickerContext();

  const {
    gridPanoramas,
    selectedDateStr,

    setSelectedDateStr,
  } = usePanoramaContext();

  const selectedDate =
    selectedDateStr && getDateWithUTCOffset(new Date(selectedDateStr));

  const minMaxDate = useMemo(
    () => getPanosMinMaxDate(gridPanoramas).map(getDateWithUTCOffset),
    [gridPanoramas],
  );

  useEffect(() => {
    if (!minMaxDate.length) {
      return;
    }

    const newDate = getDateStr(minMaxDate[1]);

    setSelectedDateStr(newDate);
  }, [minMaxDate, setSelectedDateStr]);

  if (!gridPanoramas.length || !selectedDate) {
    return null;
  }

  const dateToIsEnabledMap = gridPanoramas.reduce((map, { scanDate }) => {
    map[scanDate] = true;
    return map;
  }, {} as { [key: string]: boolean });

  function onChange(date: Date | null) {
    if (!date) {
      return;
    }
    setSelectedDateStr(getDateStr(date));
    setDatePicker(false);
  }

  function shouldDisableDate(d: Date) {
    return !dateToIsEnabledMap[getDateStr(d)];
  }

  if (!datePicker) return null;

  return (
    <ThemeProvider theme={theme}>
      <div className='pano-date-picker' color='primary'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            minDate={minMaxDate[0]}
            maxDate={minMaxDate[1]}
            shouldDisableDate={shouldDisableDate}
            displayStaticWrapperAs='desktop'
            value={selectedDate}
            onChange={onChange}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}

function getPanosMinMaxDate(panoramas: Panorama[]): [Date, Date] | [] {
  if (!panoramas.length) {
    return [];
  }
  const minMaxDateTimestamp = panoramas.reduce(
    (minMaxSoFar, { scanDate }) => {
      return [
        Math.min(minMaxSoFar[0], +new Date(scanDate)),
        Math.max(minMaxSoFar[1], +new Date(scanDate)),
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
