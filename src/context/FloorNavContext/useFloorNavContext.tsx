import { useContext } from 'react';

import { FloorNavContext } from './FloorNavContext';

export function useFloorNavContext() {
  return useContext(FloorNavContext);
}
