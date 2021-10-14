import React, { useState } from 'react';

import FloorPlan from '../FloorPlan/FloorPlan';
import MiniMap from '../MiniMap/MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { Loader } from '../Loader';
import { FloorNav } from '../FloorNav';

import { useScene, useCountRenders } from '../../hooks';
import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useCurrentFloorSceneContext } from '../../context/CurrentFloorSceneContext/useCurrentFloorSceneContext';

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
      <LeftBar onViewSelected={setSelectedViewName}></LeftBar>
      <MiniMap />
      <FloorNav />
      <BottomBar />
    </FloorNavContextProvider>
  );
};
