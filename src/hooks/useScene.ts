import { useEffect } from "react";
import * as THREE from "three";

import useFetchPanoImage from "./useFetchPanoImage";

export const useScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );

  const { loading, panoImage } = useFetchPanoImage();

  useEffect(() => {
    camera.rotation.y = Math.PI;
    camera.rotation.z = Math.PI;

    const sphere = createSphereMesh(panoImage);

    scene.add(sphere);
  }, [loading, panoImage]);

  return {
    scene: scene,
    camera: camera,
    loading: loading
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
