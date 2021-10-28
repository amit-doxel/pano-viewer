import React, { useState, useEffect } from 'react';

import { useFetchMarkers, fetchPanoImage } from '../../hooks';
import { PanoramaContextValue, PanoramaContext } from './PanoramaContext';
import { PanoMarker } from '../../components/Blueprint/models';

const PROJECT_ID = 20;
const DATE_STR = '2021-05-14';

export const PanoramaContextProvider: React.FC = ({ children }) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [projectId, setProjectId] = useState(17);
  const [buildingName, setBuildingName] = useState('Prologis+Redlands');
  const [sceneId, setSceneId] = useState(387662);
  const [currentScene, setCurrentScene] = useState('pano-image/R0140102.JPG');

  const [selectedMarker, setSelectedMarker] = useState<
    PanoMarker | undefined
  >();

  const markers = useFetchMarkers(PROJECT_ID, DATE_STR);

  // TODO: useFetchMarkers should return more information, that
  // helps to initialize selectedMarker
  useEffect(() => {
    if (!markers.length) {
      return;
    }

    setSelectedMarker(markers[0]);
  }, [markers, setSelectedMarker]);

  useEffect(() => {
    if (!selectedMarker) {
      return;
    }

    fetchPanoImage(PROJECT_ID, selectedMarker.id).then(({ link }) => {
      setCurrentScene(link);
      console.log('panoImage', link);
    });
  }, [selectedMarker]);

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
    markers,
    selectedMarker,
    setSelectedMarker,
    selectNextMarker: () => {
      if (!selectedMarker) {
        return;
      }
      const idx = markers.indexOf(selectedMarker);
      const nextIdx = idx + 1 < markers.length - 1 ? idx + 1 : 0;
      setSelectedMarker(markers[nextIdx]);
    },
    selectPrevMarker: () => {
      if (!selectedMarker) {
        return;
      }
      const idx = markers.indexOf(selectedMarker);
      const nextIdx = idx - 1 >= 0 ? idx - 1 : markers.length - 1;
      setSelectedMarker(markers[nextIdx]);
    },
  };

  return (
    <PanoramaContext.Provider value={context}>
      {children}
    </PanoramaContext.Provider>
  );
};
