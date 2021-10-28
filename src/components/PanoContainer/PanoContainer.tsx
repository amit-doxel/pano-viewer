import React, { useEffect } from 'react';

import { useScene } from '../../hooks';
import { useViewContext } from '../../context/ViewContext';
import { ThreeCanvas } from '../ThreeCanvas';
import { Arrow } from '../Arrow';
import { MiniMap } from '../MiniMap';
import { BottomBar } from '../BottomBar';

import { zoomInFunction, zoomOutFunction } from '../../utils/zoom';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';

export const PanoContainer: React.FC = () => {
  const { scene, camera } = useScene();
  const { markers, selectedMarker, setSelectedMarker } = usePanoramaContext();

  const { zoomMethods, setZoomMethods, blueprintImg } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  useEffect(() => {
    setZoomMethods({
      zoomInMethod: () => zoomInFunction(camera),
      zoomOutMethod: () => zoomOutFunction(camera),
    });
  }, []);

  return (
    <>
      <ThreeCanvas scene={scene} camera={camera} />
      <Arrow />
      {blueprintImg != null && (
        <MiniMap
          bgImg={blueprintImg}
          markers={markers}
          selectedMarker={selectedMarker}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
        />
      )}
      <BottomBar zoomIn={zoomInMethod} zoomOut={zoomOutMethod} />
    </>
  );
};
