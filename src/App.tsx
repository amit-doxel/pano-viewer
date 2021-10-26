import React from 'react';

import { PanoViewer } from './components/PanoViewer/PanoViewer';
import { FloorNavContextProvider } from './context/FloorNavContext/FloorNavContextProvider';
import { PanoramaContextProvider } from './context/PanoramaContext/PanoramaContextProvider';
import { ViewContextProvider } from './context/ViewContext/ViewContextProvider';

function App() {
  return (
    <PanoramaContextProvider>
      <ViewContextProvider>
        <FloorNavContextProvider>
          <PanoViewer />
        </FloorNavContextProvider>
      </ViewContextProvider>
    </PanoramaContextProvider>
  );
}

export default App;
