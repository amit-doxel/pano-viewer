import React, { useState } from 'react';

import { PanoramaContextValue, PanoramaContext } from './PanoramaContext';

export const PanoramaContextProvider: React.FC = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [projectId, setProjectId] = useState(17);
  const [buildingName, setBuildingName] = useState('Prologis+Redlands');
  const [sceneId, setSceneId] = useState(387662);
  const [currentScene, setCurrentScene] = useState('pano-image/R0140102.JPG');

  const context: PanoramaContextValue = {
    currentFloor: currentFloor,
    currentScene: currentScene,
    projectId: projectId,
    buildingName: buildingName,
    sceneId: sceneId,
    setCurrentFloor: setCurrentFloor,
    setCurrentScene: setCurrentScene,
    setProjectId: setProjectId,
    setBuildingName: setBuildingName,
    setSceneId: setSceneId,
  };

  return (
    <PanoramaContext.Provider value={context}>
      {children}
    </PanoramaContext.Provider>
  );
};
