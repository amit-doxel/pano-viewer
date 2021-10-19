import React, { useState } from 'react';

import { ViewContext, ViewContextValue } from './ViewContext';

export const ViewContextProvider: React.FC = ({ children }) => {
  const [view, setView] = useState('single-pano');

  const context: ViewContextValue = {
    view,
    setView,
  };

  return (
    <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
  );
};
