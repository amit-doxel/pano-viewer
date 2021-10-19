import React, {useEffect} from 'react';

import { FloorPlan } from '../FloorPlan';
import { MiniMap } from '../MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';

import { useScene, useCountRenders } from '../../hooks';
import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useViewContext } from '../../context/ViewContext/useViewContext';
import { useIdentity } from '../../hooks/useIdentity';
import { useFetchBlueprint } from '../../hooks/useFetchBlueprint';

export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { user } = useIdentity();
  const { scene, camera } = useScene();
  const { view } = useViewContext();

  const blueprintUrl = useFetchBlueprint(
    20,
    '2021-10-14'
  );

  console.log('blueprintUrl', blueprintUrl);

  if (!user) return null;

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
      <MiniMap />
      <FloorNav />
      <BottomBar />
    </FloorNavContextProvider>
  );
};
