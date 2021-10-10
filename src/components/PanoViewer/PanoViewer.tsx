import React from "react";
import { ThreeCanvas } from "../ThreeCanvas/ThreeCanvas";
import { useCountRenders } from "../../hooks/useCountRenders";
import { BottomBar } from "../BottomBar/BottomBar";
import { LeftBar } from "../LeftBar/LeftBar";
import { useScene } from "../../hooks/useScene";
import { Header } from "../Header/Header";
import { Loader } from "../Loader/Loader";

export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders("PanoViewer");
  const { scene, camera, loading } = useScene();

  if (loading) return <Loader />;
  return (
    <>
      <Header></Header>
      <ThreeCanvas scene={scene} camera={camera} />
      <LeftBar></LeftBar>
      <BottomBar></BottomBar>
    </>
  );
};
