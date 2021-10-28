import { useContext } from 'react';

import { ViewContext, ViewContextValue } from './ViewContext';

export function useViewContext() {
  return useContext<ViewContextValue>(ViewContext);
}
