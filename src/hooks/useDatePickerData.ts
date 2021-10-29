import { useState, useEffect } from 'react';

import { getData } from '../utils/get-data';

export interface DatePickerType {
  id: number;
  date: string;
  scenes: number;
}

export function useDatePickerData() {
  const [availablePanos, setAvailablePanos] = useState<DatePickerType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getData('date_picker.json', 'json');
      setAvailablePanos(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    availablePanos,
  };
}
