import { useContext } from 'react';

import { ViewContext } from './ViewContext';

export function useViewContext() {
  return useContext(ViewContext);
}
