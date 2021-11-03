import React from 'react';

import { FloorPlan } from '../FloorPlan';
import { BottomBar } from '../BottomBar';

import { useViewContext } from '../../context/ViewContext';
import { useFloorPlanZoom } from '../../hooks';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import { View } from '../../context/ViewContext/models';
import { PanoMarker } from '../Blueprint/models';

export const BluePrintContainer: React.FC = () => {
  const { view, zoomMethods } = useViewContext();

  const { panoramas, selectedPanorama, setSelectedPanorama, blueprintImg } =
    usePanoramaContext();

  const { zoomInMethod, zoomOutMethod } = zoomMethods;
  const {
    zoom: floorPlanZoom,
    onZoomChanged: onFloorPlanZoomChanged,
    zoomInMethod: floorPlanZoomInFn,
    zoomOutMethod: floorPlanZoomOutFn,
  } = useFloorPlanZoom(view);

  let localZoomInFn, localZoomOutFn;

  if (view === View.FLOORPLAN) {
    localZoomInFn = floorPlanZoomInFn;
    localZoomOutFn = floorPlanZoomOutFn;
  } else {
    localZoomInFn = zoomInMethod;
    localZoomOutFn = zoomOutMethod;
  }

  function onMarkerClick({ id: markerId }: PanoMarker) {
    const pano = panoramas.find(({ id }) => id === markerId);
    if (pano) {
      setSelectedPanorama(pano);
    }
  }

  if (blueprintImg) {
    return (
      <>
        <FloorPlan
          bgImg={blueprintImg}
          markers={panoramas}
          selectedMarker={selectedPanorama}
          onMarkerClick={onMarkerClick}
          zoom={floorPlanZoom}
          onZoomChanged={onFloorPlanZoomChanged}
        />
        <BottomBar zoomIn={localZoomInFn} zoomOut={localZoomOutFn} />
      </>
    );
  } else {
    return <></>;
  }
};
