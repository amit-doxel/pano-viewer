import { useContext } from 'react';

import { CurrentFloorSceneContext } from './CurrentFloorSceneContext';

export function useCurrentFloorSceneContext() {
  return useContext(CurrentFloorSceneContext);
}
