import React, { useEffect } from 'react';

import { useScene } from '../../hooks';
import { useViewContext } from '../../context/ViewContext';
import { ThreeCanvas } from '../ThreeCanvas';
import { Arrow } from '../Arrow';
import { BottomBar } from '../BottomBar';

import { zoomInFunction, zoomOutFunction } from '../../utils/zoom';

export const PanoContainer: React.FC = () => {
  const { scene, camera } = useScene();

  const { zoomMethods, setZoomMethods } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  useEffect(() => {
    setZoomMethods({
      zoomInMethod: () => zoomInFunction(camera),
      zoomOutMethod: () => zoomOutFunction(camera),
    });
  }, [camera, setZoomMethods]);

  return (
    <>
      <ThreeCanvas scene={scene} camera={camera} />
      <Arrow />
      <BottomBar zoomIn={zoomInMethod} zoomOut={zoomOutMethod} />
    </>
  );
};
