import { createContext } from 'react';

export type DatePickerContextValue = {
  datePicker: boolean;
  setDatePicker: (value: boolean) => any;
};

export const DatePickerContext = createContext({
  datePicker: false,
  setDatePicker: (value: boolean) => null,
});
