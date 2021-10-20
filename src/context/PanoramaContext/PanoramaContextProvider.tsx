import React, { useState } from 'react';

import { PanoramaContextValue, PanoramaContext } from './PanoramaContext';

export const PanoramaContextProvider: React.FC = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState('1');
  const [currentScene, setCurrentScene] = useState(
    'pano_image/second_image.jpg',
  );
  const [projectId, setProjectId] = useState('1');

  const context: PanoramaContextValue = {
    currentFloor: currentFloor,
    currentScene: currentScene,
    projectId: projectId,
    setCurrentFloor: setCurrentFloor,
    setCurrentScene: setCurrentScene,
    setProjectId: setProjectId,
  };

  return (
    <PanoramaContext.Provider value={context}>
      {children}
    </PanoramaContext.Provider>
  );
};
