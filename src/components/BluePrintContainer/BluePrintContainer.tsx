import React from 'react';

import { FloorPlan } from '../FloorPlan';
import { BottomBar } from '../BottomBar';

import { useViewContext } from '../../context/ViewContext';

import { useFloorPlanZoom } from '../../hooks';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import { View } from '../../context/ViewContext/models';

export const BluePrintContainer: React.FC = () => {
  const { view, blueprintImg, zoomMethods } = useViewContext();

  const { markers, selectedMarker, setSelectedMarker } = usePanoramaContext();

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

  if (blueprintImg) {
    return (
      <>
        <FloorPlan
          bgImg={blueprintImg}
          markers={markers}
          selectedMarker={selectedMarker}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
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
