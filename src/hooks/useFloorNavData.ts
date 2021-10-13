import { useState, useEffect } from 'react';
import { getData } from '../utils/get-data';

export interface FloorDataType {
  id: number;
  floor_name: string;
  scenes: number;
}

export function useFloorNavData() {
  const [floorNavData, setFloorNavData] = useState<FloorDataType[]>();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getData('floor_nav.json', 'json');
      setFloorNavData(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    floorNavData,
  };
}
