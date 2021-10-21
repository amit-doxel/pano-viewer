import React, { useState } from 'react';
import { useScene } from '../../hooks';
import { zoomInFunction, zoomOutFunction } from '../../utils/zoom';

import { ViewContext, ViewContextValue, ZoomMethods } from './ViewContext';

export const ViewContextProvider: React.FC = ({ children }) => {
  const { camera } = useScene();

  const [view, setView] = useState('single-pano');
  const [zoomMethods, setZoomMethods] = useState<ZoomMethods>({
    zoomInMethod: () => zoomInFunction(camera),
    zoomOutMethod: () => zoomOutFunction(camera),
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
