import React from 'react';

import { FloorPlan } from '../FloorPlan';
import { MiniMap } from '../MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';
import { Arrow } from '../Arrow';

import { useScene, useCountRenders } from '../../hooks';
import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useViewContext } from '../../context/ViewContext/useViewContext';
import { useIdentity } from '../../hooks/useIdentity';

export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { user } = useIdentity();
  const { scene, camera } = useScene();
  const { view } = useViewContext();

  // if (!user) return null;

  const selectedView =
    view === 'single-pano' ? (
      <ThreeCanvas scene={scene} camera={camera} />
    ) : (
      <FloorPlan />
    );

  return (
    <FloorNavContextProvider>
      <Header />
      {selectedView}
      <LeftBar />
      <Arrow url='/assets/icons/left-arrow.svg' leftPos='-10px' />
      <Arrow url='/assets/icons/right-arrow.svg' leftPos='95vw' />
      <MiniMap />
      <FloorNav />
      <BottomBar />
    </FloorNavContextProvider>
  );
};
