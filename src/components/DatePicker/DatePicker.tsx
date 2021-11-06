import React from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core/styles';

import './styles.css';

export interface PanoDatePickerProps {
  minMaxDate: [Date, Date];
  dateToIsEnabledMap: { [key: string]: boolean };
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export function PanoDatePicker(props: PanoDatePickerProps) {
  const { minMaxDate, dateToIsEnabledMap, selectedDate, onChange } = props;

  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ff8000',
      },
    },
  });

  function shouldDisableDate(d: Date) {
    return !dateToIsEnabledMap[getDateStr(d)];
  }

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
            onChange={(date) => date && onChange(date)}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}

function getDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}
