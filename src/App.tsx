import React from 'react';

import { PanoViewer } from './components/PanoViewer/PanoViewer';
import { CurrentFloorSceneContextProvider } from './context/CurrentFloorSceneContext/CurrentFloorSceneContextProvider';
import { ViewContextProvider } from './context/ViewContext/ViewContextProvider';

function App() {
  return (
    <div>
      <CurrentFloorSceneContextProvider>
        <ViewContextProvider>
          <PanoViewer></PanoViewer>
        </ViewContextProvider>
      </CurrentFloorSceneContextProvider>
    </div>
  );
}

export default App;
