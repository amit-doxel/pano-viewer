import React, { useEffect } from 'react';

import { FloorPlan } from '../FloorPlan';
import { BottomBar } from '../BottomBar';

import { useViewContext } from '../../context/ViewContext';
import { useFloorPlanZoom } from '../../hooks';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';

export const BluePrintContainer: React.FC = () => {
  const { view, blueprintImg, zoomMethods, setZoomMethods } = useViewContext();

  const { markers,  selectedMarker, setSelectedMarker } = usePanoramaContext();

  const { zoomInMethod, zoomOutMethod } = zoomMethods;
  const {
    zoom: floorPlanZoom,
    onZoomChanged: onFloorPlanZoomChanged,
    zoomInMethod: floorPlanZoomInFn,
    zoomOutMethod: floorPlanZoomOutFn,
  } = useFloorPlanZoom(view);

  useEffect(() => {
    setZoomMethods({
      zoomInMethod: () => floorPlanZoomInFn,
      zoomOutMethod: () => floorPlanZoomOutFn,
    });
  }, []);

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
        <BottomBar zoomIn={zoomInMethod} zoomOut={zoomOutMethod} />
      </>
    );
  } else {
    return <></>;
  }
};
