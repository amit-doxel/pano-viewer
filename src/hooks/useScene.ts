import { useEffect } from 'react';
import * as THREE from 'three';
import { usePanoramaContext } from '../context/PanoramaContext/usePanoramaContext';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1100,
);

export const useScene = () => {
  const { currentScene } = usePanoramaContext();
  useEffect(() => {
    camera.rotation.y = Math.PI;
    camera.rotation.z = Math.PI;

    const sphere = createSphereMesh(
      currentScene,
      // will remove this link and add panoImage when the real API integration will be done
    );
    scene.add(sphere);
  }, []);

  return {
    scene: scene,
    camera: camera,
  };
};

function createSphereMesh(imageUrl: string): THREE.Mesh {
  const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
  sphereGeometry.scale(-1, 1, 1);
  const texture = new THREE.TextureLoader().load(imageUrl);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphereMesh = new THREE.Mesh(sphereGeometry, material);

  sphereMesh.rotation.z = Math.PI;
  sphereMesh.rotation.y = -Math.PI / 2;

  return sphereMesh;
}
