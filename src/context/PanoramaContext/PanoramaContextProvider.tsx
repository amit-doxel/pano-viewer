import React, { useState, useEffect, useCallback } from 'react';

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
import { PROJECT_ID } from '../../utils/constants';
import { Grid } from '../../models/grid';
import { getGridId } from "../../utils/grids";

export const PanoramaContextProvider: React.FC = ({ children }) => {
  const [projectId, setProjectId] = useState(PROJECT_ID);
  const [buildingName, setBuildingName] = useState('Prologis+Redlands');
  const [selectedPanorama, setSelectedPanorama] = useState<
    Panorama | undefined
  >();
  const [selectedGrid, setSelectedGrid] = useState<Grid | undefined>();
  const [selectedFloor, setSelectedFloor] = useState<Floor | undefined>();
  const [selectedDateStr, setSelectedDateStr] = useState<string | undefined>();
  const [blueprintImg, setBlueprintImg] = useState<
    HTMLImageElement | undefined
  >();

  console.log('selectedGrid', selectedGrid);

  const floors = useFetchFloors(projectId);

  const { grids, panoramas, setGrids } = useFetchPanoramasForScanDate(
    projectId,
    selectedDateStr,
  );

  const selectedGridId = selectedGrid && selectedGrid.id;

  const gridPanoramas = useFetchGridPanos(projectId, selectedGridId);

  const panoId = selectedPanorama && selectedPanorama.id;
  const currentScene = useFetchPanoImage(panoId);

  // set default selected floor
  useEffect(() => {
    if (!floors.length) {
      return;
    }
    const floor = floors[0];
    setSelectedFloor(floor);
  }, [floors, setSelectedFloor]);

  // get blueprint image
  useEffect(() => {
    if (!selectedFloor) {
      return;
    }

    const { blueprintSignedUrl } = selectedFloor;
    const date = selectedFloor.scans[selectedFloor.scans.length - 1];

    setSelectedDateStr(date);

    getImageFromUrl(blueprintSignedUrl)
      .then((img: HTMLImageElement) => {
        setBlueprintImg(img);
      })
      .catch((err) => {
        console.error('getImageFromUrl: could not get img from url', err);
      });
  }, [selectedFloor, setSelectedDateStr]);

  //update selected grid if needed when panorama changes
  useEffect(() => {
    if (!selectedPanorama || !grids.length) {
      return;
    }

    const selectedGridId = selectedGrid && selectedGrid.id;
    const newGridId = getGridId(selectedPanorama);

    if (selectedGridId === newGridId) {
      return;
    }

    const newSelectedGrid = grids.find(({id}) => id === newGridId);

    setSelectedGrid(newSelectedGrid);
  }, [grids, selectedPanorama, selectedGrid, setSelectedGrid]);

  //set default selected grid
  useEffect(() => {
    if (!grids.length || selectedGrid != null) {
      return;
    }
    const grid = grids[0];
    setSelectedGrid(grid);
  }, [grids, selectedGrid, setSelectedGrid]);

  // set panorama image when grid changes
  useEffect(() => {
    if (!selectedGrid) {
      return;
    }
    setSelectedPanorama(selectedGrid.panoramas[0]);
  }, [selectedGrid, setSelectedPanorama]);

  const onDateChange = useCallback(
    function (dateStr: string, panorama?: Panorama) {
      if (panorama) {
        setSelectedPanorama(panorama);
      } else {
        // reset values so defalt values get picked up
        setGrids([]);
        setSelectedGrid(undefined);
        setSelectedPanorama(undefined);
      }
      setSelectedDateStr(dateStr);
    },
    [setSelectedDateStr, setGrids],
  );

  const selectNextPanorama = useCallback(() => {
    if (!selectedPanorama) {
      return;
    }
    const idx = panoramas.findIndex(({ id }) => selectedPanorama.id === id);
    const nextIdx = idx + 1 < panoramas.length ? idx + 1 : 0;
    setSelectedPanorama(panoramas[nextIdx]);
  }, [panoramas, selectedPanorama, setSelectedPanorama]);

  const selectPrevPanorama = useCallback(() => {
    if (!selectedPanorama) {
      return;
    }
    const idx = panoramas.findIndex(({ id }) => selectedPanorama.id === id);
    const nextIdx = idx - 1 >= 0 ? idx - 1 : panoramas.length - 1;
    setSelectedPanorama(panoramas[nextIdx]);
  }, [panoramas, selectedPanorama, setSelectedPanorama]);

  const context: PanoramaContextValue = {
    currentScene: currentScene,
    projectId: projectId,
    buildingName: buildingName,
    setProjectId: setProjectId,
    setBuildingName: setBuildingName,
    panoramas,
    grids,
    floors,
    selectedFloor,
    blueprintImg,
    gridPanoramas,
    selectedPanorama,
    selectedDateStr,
    setSelectedDateStr,
    setSelectedPanorama,
    setSelectedFloor,
    selectedGrid,
    setSelectedGrid,
    onDateChange,
    selectNextPanorama,
    selectPrevPanorama,
  };

  return (
    <PanoramaContext.Provider value={context}>
      {children}
    </PanoramaContext.Provider>
  );
};
