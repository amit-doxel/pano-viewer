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
import { useIdentity } from '../../hooks/useIdentity';

import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useViewContext } from '../../context/ViewContext/useViewContext';
import { Loader } from '../Loader';

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
  const { scene, camera, loading } = useScene();
  const { view, zoomMethods } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  if (!user) return null;

  if (loading && view === 'single-pano') return <Loader />;

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
      <BottomBar zoomIn={zoomInMethod} zoomOut={zoomOutMethod} />
    </FloorNavContextProvider>
  );
};
