import { useRef } from 'react';

export const useCountRenders = (componentName: string) => {
  const countRef = useRef(1);
  console.log(`DEBUG: React Rendering ${componentName}: ${countRef.current++}`);
};
