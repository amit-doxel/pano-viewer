import { CameraMouseControls } from './CameraMouseControls';

export const initDefaultControls = (
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
) => {
  new CameraMouseControls(camera, canvas);

  const zoomLevel = new ZoomLevel();
  const onWheelInCanvas = (e: WheelEvent) => {
    camera.fov = zoomLevel.get(e.deltaY);
    camera.updateProjectionMatrix();
  };
  canvas.addEventListener('wheel', onWheelInCanvas);

  return () => {
    canvas.removeEventListener('wheel', onWheelInCanvas);
  };
};

const zoomLevels = [75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25];

class ZoomLevel {
  private zoomLevel: number;

  constructor() {
    this.zoomLevel = 0;
  }

  public get(deltaY: number): number {
    let delta = -Math.sign(deltaY);
    this.zoomLevel = this.zoomLevel + delta;
    this.zoomLevel = Math.max(this.zoomLevel, 0);
    this.zoomLevel = Math.min(this.zoomLevel, zoomLevels.length - 1);
    return zoomLevels[this.zoomLevel];
  }
}
