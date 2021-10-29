import * as React from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core/styles';

import { useDatePickerData } from '../../hooks';
import { useDatePickerContext } from '../../context/DatePickerContext/useDatePickerContext';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';

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
  const [value, setValue] = React.useState<Date | null>(new Date());

  const { datePicker } = useDatePickerContext();
  const { currentScene, setCurrentScene } = usePanoramaContext();
  const { availablePanos } = useDatePickerData();

  const onDateChange = (newValue: Date | null) => {
    if (currentScene === 'pano-image/R0140118.JPG') {
      setCurrentScene('pano-image/R0140102.JPG');
    } else {
      setCurrentScene('pano-image/R0140118.JPG');
    }

    setValue(newValue);
  };

  const disableDateWithoutScenes = (date: Date) => {
    for (const availablePano of availablePanos) {
      if (new Date(availablePano.date).getTime() === date.getTime()) {
        if (availablePano.scenes !== 0) return false;
      }
    }

    return true;
  };

  if (!datePicker) return null;

  return (
    <ThemeProvider theme={theme}>
      <div className='pano-date-picker' color='primary'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            minDate={new Date('10/01/2021')}
            maxDate={new Date('10/30/2021')}
            shouldDisableDate={disableDateWithoutScenes}
            displayStaticWrapperAs='desktop'
            value={value}
            onChange={(newValue: Date | null) => onDateChange(newValue)}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}
