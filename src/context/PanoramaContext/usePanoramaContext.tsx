import { useContext } from 'react';

import { PanoramaContext } from './PanoramaContext';

export function usePanoramaContext() {
  return useContext(PanoramaContext);
}
