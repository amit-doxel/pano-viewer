import React from 'react';

import { FloorPlan } from '../FloorPlan';
import { MiniMap } from '../MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';
import { Arrow } from '../Arrow';

import { zoomInFunction, zoomOutFunction } from '../../utils/zoom';

import { useScene, useCountRenders } from '../../hooks';
import { useIdentity } from '../../hooks/useIdentity';
import { useFetchBlueprint } from '../../hooks/useFetchBlueprint';

import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useViewContext } from '../../context/ViewContext/useViewContext';

// NOTES:
// 1. Should have a PanoVisContainer component that can hold
// either PanoContainer or BluePrintContainer maped to diff routes
// 2. PanoContainer will have panorama renderer that takes
// the whole dims and the minimap
// 3. BluePrintContainer will have FloorPlan and MiniPano
export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { user } = useIdentity();
  const { scene, camera } = useScene();
  const { view } = useViewContext();

  const blueprintUrl = useFetchBlueprint(20, '2021-10-14');

  if (!user) return null;

  const selectedView =
    view === 'single-pano' ? (
      <>
        <ThreeCanvas scene={scene} camera={camera} />
        <Arrow />
      </>
    ) : (
      <FloorPlan />
    );

  return (
    <FloorNavContextProvider>
      <Header />
      {selectedView}
      <LeftBar />
      <MiniMap />
      <FloorNav />
      <BottomBar zoomIn={zoomInFunction} zoomOut={zoomOutFunction} />
    </FloorNavContextProvider>
  );
};
