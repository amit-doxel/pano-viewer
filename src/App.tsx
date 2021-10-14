import React from 'react';

import { PanoViewer } from './components/PanoViewer/PanoViewer';
import { CurrentFloorSceneContextProvider } from './context/CurrentFloorSceneContext/CurrentFloorSceneContextProvider';

function App() {
  return (
    <div>
      <CurrentFloorSceneContextProvider>
        <PanoViewer></PanoViewer>
      </CurrentFloorSceneContextProvider>
    </div>
  );
}

export default App;
