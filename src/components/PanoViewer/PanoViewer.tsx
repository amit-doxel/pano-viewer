import React, {useState} from 'react';

import { ThreeCanvas } from '../ThreeCanvas/ThreeCanvas';
import { useCountRenders } from '../../hooks/useCountRenders';
import { BottomBar } from '../BottomBar/BottomBar';
import { LeftBar } from '../LeftBar/LeftBar';
import { useScene } from '../../hooks/useScene';
import { Header } from '../Header/Header';
import { Loader } from '../Loader/Loader';
import FloorPlan from '../FloorPlan/FloorPlan';
import MiniMap from '../MiniMap/MiniMap';

export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { scene, camera, loading } = useScene();

  const [selectedViewName, setSelectedViewName] = useState('single-pano');

  const selectedView = selectedViewName === 'single-pano'
    ? <ThreeCanvas scene={scene} camera={camera} />
    : <FloorPlan/>;

  if (loading) return <Loader />;

  return (
    <>
      <Header></Header>
      {selectedView}
      <LeftBar onViewSelected={setSelectedViewName}></LeftBar>
      <MiniMap/>
      <BottomBar></BottomBar>
    </>
  );
};
