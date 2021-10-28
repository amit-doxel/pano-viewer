import { useContext } from 'react';

import { DatePickerContext } from './DatePickerContext';

export function useDatePickerContext() {
  return useContext(DatePickerContext);
}
