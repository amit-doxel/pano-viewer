import React, { useState, useEffect } from 'react';

import { useScene, useFetchMarkers } from '../../hooks';

import { useViewContext } from '../../context/ViewContext';
import { ThreeCanvas } from '../ThreeCanvas';
import { Arrow } from '../Arrow';
import { MiniMap } from '../MiniMap';
import { BottomBar } from '../BottomBar';

import { useFetchBlueprintImage } from '../../hooks/useFetchBlueprintImage';

import { PanoMarker } from '../Blueprint';
import { zoomInFunction, zoomOutFunction } from '../../utils/zoom';

const PROJECT_ID = 20;
const DATE_STR = '2021-05-14';

export const PanoContainer: React.FC = () => {
  const { scene, camera } = useScene();
  const { zoomMethods, setZoomMethods } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  const img = useFetchBlueprintImage(PROJECT_ID, DATE_STR);

  const markers = useFetchMarkers(PROJECT_ID, DATE_STR);

  const [selectedMarker, setSelectedMarker] = useState<
    PanoMarker | undefined
  >();

  useEffect(() => {
    setZoomMethods({
      zoomInMethod: () => zoomInFunction(camera),
      zoomOutMethod: () => zoomOutFunction(camera),
    });
  }, []);

  useEffect(() => {
    if (!markers.length) {
      return;
    }

    setSelectedMarker(markers[0]);
  }, [markers]);

  return (
    <>
      <ThreeCanvas scene={scene} camera={camera} />
      <Arrow />
      {img != null && (
        <MiniMap
          bgImg={img}
          markers={markers}
          selectedMarker={selectedMarker}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
        />
      )}
      <BottomBar zoomIn={zoomInMethod} zoomOut={zoomOutMethod} />
    </>
  );
};
