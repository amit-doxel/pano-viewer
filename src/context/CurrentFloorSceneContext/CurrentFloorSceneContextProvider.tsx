import React, { useState } from 'react';

import {
  CurrentFloorSceneContextValue,
  CurrentFloorSceneContext,
} from './CurrentFloorSceneContext';

export const CurrentFloorSceneContextProvider: React.FC = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState('1');
  const [currentScene, setCurrentScene] = useState(
    'pano_image/second_image.jpeg',
  );
  const [projectId, setProjectId] = useState('1');

  const context: CurrentFloorSceneContextValue = {
    currentFloor: currentFloor,
    currentScene: currentScene,
    projectId: projectId,
    setCurrentFloor: setCurrentFloor,
    setCurrentScene: setCurrentScene,
    setProjectId: setProjectId,
  };

  return (
    <CurrentFloorSceneContext.Provider value={context}>
      {children}
    </CurrentFloorSceneContext.Provider>
  );
};
