import React, { useState, useEffect } from 'react';

import {
  useFetchPanoramasForScanDate,
  useFetchFloors,
  useFetchGridPanos,
  useFetchPanoImage,
} from '../../hooks';
import { PanoramaContextValue, PanoramaContext } from './PanoramaContext';
import { Panorama } from '../../models/panorama';
import { Floor } from '../../models/floor';
import { getImageFromUrl } from '../../components/Blueprint';

const PROJECT_ID = 17;

export const PanoramaContextProvider: React.FC = ({ children }) => {
  const [projectId, setProjectId] = useState(PROJECT_ID);
  const [buildingName, setBuildingName] = useState('Prologis+Redlands');
  const [selectedPanorama, setSelectedPanorama] = useState<
    Panorama | undefined
  >();
  const [selectedFloor, setSelectedFloor] = useState<Floor | undefined>();
  const [selectedGridId, setSelectedGridId] = useState<number | undefined>();
  const [selectedDateStr, setSelectedDateStr] = useState<string | undefined>();
  const [blueprintImg, setBlueprintImg] = useState<
    HTMLImageElement | undefined
  >();

  const floors = useFetchFloors(projectId);

  const panoramas = useFetchPanoramasForScanDate(projectId, selectedDateStr);
  const gridPanoramas = useFetchGridPanos(projectId, selectedGridId);

  const panoId = selectedPanorama && selectedPanorama.id;
  const currentScene = useFetchPanoImage(projectId, panoId);

  useEffect(() => {
    if (!floors.length) {
      return;
    }
    const floor = floors[0];
    setSelectedFloor(floor);
  }, [floors, setSelectedFloor]);

  useEffect(() => {
    if (!selectedFloor) {
      return;
    }

    const { blueprintSignedUrl } = selectedFloor;
    const { date } = selectedFloor.scans[0];

    setSelectedDateStr(date);

    getImageFromUrl(blueprintSignedUrl)
      .then((img: HTMLImageElement) => {
        setBlueprintImg(img);
      })
      .catch((err) => {
        console.error('getImageFromUrl: could not get img from url', err);
      });
  }, [selectedFloor, setSelectedDateStr]);

  useEffect(() => {
    if (!panoramas.length) {
      return;
    }
    const panorama = panoramas[0];
    setSelectedPanorama(panorama);
    setSelectedGridId(panorama.gridId);
  }, [panoramas, setSelectedPanorama]);

  const context: PanoramaContextValue = {
    currentScene: currentScene,
    projectId: projectId,
    buildingName: buildingName,
    setProjectId: setProjectId,
    setBuildingName: setBuildingName,
    panoramas,
    floors,
    selectedFloor,
    blueprintImg,
    gridPanoramas,
    selectedPanorama,
    selectedDateStr,
    setSelectedDateStr,
    setSelectedPanorama,
    setSelectedFloor,
    selectNextPanorama: () => {
      if (!selectedPanorama) {
        return;
      }
      const idx = panoramas.indexOf(selectedPanorama);
      const nextIdx = idx + 1 < panoramas.length ? idx + 1 : 0;
      setSelectedPanorama(panoramas[nextIdx]);
    },
    selectPrevPanorama: () => {
      if (!selectedPanorama) {
        return;
      }
      const idx = panoramas.indexOf(selectedPanorama);
      const nextIdx = idx - 1 >= 0 ? idx - 1 : panoramas.length - 1;
      setSelectedPanorama(panoramas[nextIdx]);
    },
  };

  return (
    <PanoramaContext.Provider value={context}>
      {children}
    </PanoramaContext.Provider>
  );
};
