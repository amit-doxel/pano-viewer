import { useState, useEffect } from 'react';
import { getData } from '../utils/get-data';

export interface DatePickerType {
  id: number;
  date: string;
  scenes: number;
}

export function useDatePickerData() {
  const [datePickerData, setDatePickerData] = useState<DatePickerType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getData('date_picker.json', 'json');
      setDatePickerData(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    datePickerData,
  };
}
