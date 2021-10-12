import { useState, useEffect } from 'react';

export interface FloorDataType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function useFloorNavData() {
  const [floorNavData, setFloorNavData] = useState<FloorDataType[]>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then(
        (result) => {
          setFloorNavData(result.slice(0, 100));
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  return {
    floorNavData,
  };
}
