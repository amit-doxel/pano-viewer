import React, { useState } from 'react';

import { ViewContext, ViewContextValue, ZoomMethods } from './ViewContext';
import { View } from './models';

export const ViewContextProvider: React.FC = ({ children }) => {
  const [view, setView] = useState(View.SINGLE_PANO);
  const [zoomMethods, setZoomMethods] = useState<ZoomMethods>({
    zoomInMethod: () => null,
    zoomOutMethod: () => null,
  });

  const context: ViewContextValue = {
    view,
    zoomMethods,
    setView,
    setZoomMethods,
  };

  return (
    <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
  );
};
