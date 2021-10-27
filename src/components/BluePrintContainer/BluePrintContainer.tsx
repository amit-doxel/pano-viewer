import React, { useState, useEffect } from 'react';

import { FloorPlan } from '../FloorPlan';
import { BottomBar } from '../BottomBar';

import { useViewContext } from '../../context/ViewContext';
import { PanoMarker } from '../Blueprint';

import { useFloorPlanZoom, useFetchMarkers } from '../../hooks';

import { useFetchBlueprintImage } from '../../hooks/useFetchBlueprintImage';

const PROJECT_ID = 20;
const DATE_STR = '2021-05-14';

export const BluePrintContainer: React.FC = () => {
  const { view, zoomMethods, setZoomMethods } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  const [selectedMarker, setSelectedMarker] = useState<
    PanoMarker | undefined
  >();

  const {
    zoom: floorPlanZoom,
    onZoomChanged: onFloorPlanZoomChanged,
    zoomInMethod: floorPlanZoomInFn,
    zoomOutMethod: floorPlanZoomOutFn,
  } = useFloorPlanZoom(view);

  useEffect(() => {
    setZoomMethods({
      zoomInMethod: floorPlanZoomInFn,
      zoomOutMethod: floorPlanZoomOutFn,
    });
  }, []);

  const img = useFetchBlueprintImage(PROJECT_ID, DATE_STR);

  const markers = useFetchMarkers(PROJECT_ID, DATE_STR);

  useEffect(() => {
    if (!markers.length) {
      return;
    }

    setSelectedMarker(markers[0]);
  }, [markers]);

  if (img !== null) {
    return (
      <>
        <FloorPlan
          bgImg={img}
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
