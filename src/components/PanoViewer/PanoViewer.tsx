import React, { useState } from 'react';

import { FloorPlan } from '../FloorPlan';
import { MiniMap } from '../MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';

import { useScene, useCountRenders } from '../../hooks';
import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
//import { useCurrentFloorSceneContext } from '../../context/CurrentFloorSceneContext/useCurrentFloorSceneContext';

// NOTES:
// 1. Should have a PanoVisContainer component that can hold
// either PanoContainer or BluePrintContainer maped to diff routes
// 2. PanoContainer will have panorama renderer that takes
// the whole dims and the minimap
// 3. BluePrintContainer will have FloorPlan and MiniPano
export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { scene, camera } = useScene();

  const [selectedViewName, setSelectedViewName] = useState('single-pano');

  const selectedView =
    selectedViewName === 'single-pano' ? (
      <ThreeCanvas scene={scene} camera={camera} />
    ) : (
      <FloorPlan />
    );

  return (
    <FloorNavContextProvider>
      <Header />
      {selectedView}
      <LeftBar changeViewTo={setSelectedViewName}></LeftBar>
      <MiniMap />
      <FloorNav />
      <BottomBar changeViewTo={setSelectedViewName} />
    </FloorNavContextProvider>
  );
};
