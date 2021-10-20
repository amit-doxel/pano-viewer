import React from 'react';

import { PanoViewer } from './components/PanoViewer/PanoViewer';
import { PanoramaContextProvider } from './context/PanoramaContext/PanoramaContextProvider';
import { ViewContextProvider } from './context/ViewContext/ViewContextProvider';

function App() {
  return (
    <div>
      <PanoramaContextProvider>
        <ViewContextProvider>
          <PanoViewer />
        </ViewContextProvider>
      </PanoramaContextProvider>
    </div>
  );
}

export default App;
