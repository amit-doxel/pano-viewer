import React, { useState } from 'react';

import { ViewContext, ViewContextValue, ZoomMethods } from './ViewContext';
import { View } from './models';
import { useFetchBlueprintImage } from '../../hooks/useFetchBlueprintImage';

const PROJECT_ID = 20;
const DATE_STR = '2021-05-14';

export const ViewContextProvider: React.FC = ({ children }) => {
  const [view, setView] = useState(View.SINGLE_PANO);
  const [zoomMethods, setZoomMethods] = useState<ZoomMethods>({
    zoomInMethod: () => null,
    zoomOutMethod: () => null,
  });

  const blueprintImg = useFetchBlueprintImage(PROJECT_ID, DATE_STR);

  const context: ViewContextValue = {
    view,
    zoomMethods,
    setView,
    setZoomMethods,
    blueprintImg,
  };

  return (
    <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
  );
};
