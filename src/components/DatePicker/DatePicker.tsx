import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { useDatePickerData } from '../../hooks';
import { createTheme } from '@material-ui/core/styles';

import './styles.css';
import { useDatePickerContext } from '../../context/DatePickerContext/useDatePickerContext';
import { ThemeProvider } from '@emotion/react';

export function PanoDatePicker() {
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ff8000"
      }
    },
  });
  const [value, setValue] = React.useState<Date | null>(new Date());

  const { datePicker } = useDatePickerContext();

  const { datePickerData } = useDatePickerData()

  const disableDateWithoutScenes = (date: Date) => {
    for(let i=0;i<datePickerData.length;i++){
      if(new Date(datePickerData[i].date)===date){
        if(datePickerData[i].scenes!==0) return false
      }
    }
    return true
  }
  if (!datePicker) return null;

  return (
    <ThemeProvider theme={theme}>
      <div className='pano-date-picker' color="primary">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            minDate={new Date('11/01/2021')}
            maxDate={new Date('11/30/2021')}
            shouldDisableDate={disableDateWithoutScenes}
            displayStaticWrapperAs='desktop'
            value={value}
            onChange={(newValue: Date | null) => {
              setValue(newValue);
            }}
            renderInput={(params: any) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}
