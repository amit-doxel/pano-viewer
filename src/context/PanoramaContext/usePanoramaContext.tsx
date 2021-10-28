import { useContext } from 'react';

import { PanoramaContext, PanoramaContextValue } from './PanoramaContext';

export function usePanoramaContext() {
  return useContext<PanoramaContextValue>(PanoramaContext);
}
