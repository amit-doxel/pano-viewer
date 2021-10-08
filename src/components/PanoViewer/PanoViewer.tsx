import React from 'react';
import { ThreeCanvas } from '../ThreeCanvas/ThreeCanvas';
import { useCountRenders } from '../../hooks/useCountRenders';
import { BottomBar } from '../BottomBar/BottomBar';
import { LeftBar } from '../LeftBar/LeftBar';
import { useScene } from '../../hooks/useScene';
import { Header } from '../Header/Header';

export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { scene, camera } = useScene();
  return (
    <>
      <Header></Header>
      <ThreeCanvas scene={scene} camera={camera} />
      <LeftBar></LeftBar>
      <BottomBar></BottomBar>
    </>
  );
};
