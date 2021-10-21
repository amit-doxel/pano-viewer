export const zoomInFunction = (camera: THREE.PerspectiveCamera) => {
  const fov = getFov(camera);
  camera.fov = clickZoom(fov, 'zoomIn');
  camera.updateProjectionMatrix();
};

export const zoomOutFunction = (camera: THREE.PerspectiveCamera) => {
  const fov = getFov(camera);
  camera.fov = clickZoom(fov, 'zoomOut');
  camera.updateProjectionMatrix();
};

const clickZoom = (value: number, zoomType: string) => {
  if (value >= 20 && zoomType === 'zoomIn') {
    return value - 5;
  } else if (value <= 75 && zoomType === 'zoomOut') {
    return value + 5;
  } else {
    return value;
  }
};

const getFov = (camera: THREE.PerspectiveCamera) => {
  return Math.floor(
    (2 *
      Math.atan(camera.getFilmHeight() / 2 / camera.getFocalLength()) *
      180) /
      Math.PI,
  );
};
