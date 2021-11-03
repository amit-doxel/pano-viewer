import React, { useState } from 'react';

import { DatePickerContext, DatePickerContextValue } from './DatePickerContext';

export const DatePickerContextProvider: React.FC = ({ children }) => {
  const [datePicker, setDatePicker] = useState(false);

  const context: DatePickerContextValue = {
    datePicker,
    setDatePicker,
  };

  return (
    <DatePickerContext.Provider value={context}>
      {children}
    </DatePickerContext.Provider>
  );
};
