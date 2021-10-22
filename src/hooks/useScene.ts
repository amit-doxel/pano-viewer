import { useEffect } from 'react';
import * as THREE from 'three';

import { usePanoramaContext } from '../context/PanoramaContext/usePanoramaContext';
import useFetchPanoImage from './useFetchPanoImage';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1100,
);

export const useScene = () => {
  const { projectId, sceneId } = usePanoramaContext();
  const { loading, panoImage } = useFetchPanoImage(projectId, sceneId);

  useEffect(() => {
    camera.rotation.y = Math.PI;
    camera.rotation.z = Math.PI;

    const sphere = createSphereMesh(panoImage);

    scene.add(sphere);
  }, [panoImage, loading]);

  return {
    scene: scene,
    camera: camera,
    loading: loading,
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
