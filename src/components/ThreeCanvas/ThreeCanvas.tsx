import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

import { initDefaultControls } from '../Controls/DefaultControls';
import { useCountRenders } from '../../hooks/useCountRenders';

interface Props {
  scene: any;
  camera: THREE.PerspectiveCamera;
  onUpdate?: () => void;
}

export const ThreeCanvas: React.FC<Props> = ({ scene, camera, onUpdate }) => {
  // debug info, will keep this react becomes stable
  useCountRenders('ThreeCanvas');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
    });

    const disposeControls = initDefaultControls(canvas, camera);

    animate(renderer, scene, camera, onUpdate);

    return () => {
      disposeControls();
    };
  }, [scene, camera, onUpdate]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100vh' }}
        width={1920}
        height={1080}
      ></canvas>
    </>
  );
};

function resizeRenderer(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  return (
    canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight
  );
}

function animate(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onUpdate?: () => void,
) {
  if (resizeRenderer(renderer)) {
    resizeRendererToDisplaySize(renderer);
    resetCameraAspectRatio(renderer, camera);
  }
  requestAnimationFrame(() => {
    animate(renderer, scene, camera, onUpdate);
  });

  if (onUpdate) onUpdate();

  renderer.render(scene, camera);
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
}

function resetCameraAspectRatio(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
) {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}
