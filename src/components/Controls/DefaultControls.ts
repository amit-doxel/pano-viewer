import { CameraMouseControls } from './CameraMouseControls';

export const initDefaultControls = (
    canvas: any,
    camera: THREE.PerspectiveCamera,
) => {
    new CameraMouseControls(camera, canvas);

    const zoomLevel = new ZoomLevel();
    const onWheelInCanvas = (e: WheelEvent) => {
        camera.fov = zoomLevel.get(e.deltaY);
        camera.updateProjectionMatrix();
    };
    canvas.addEventListener('wheel', onWheelInCanvas);

    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');

    const zoomInFunction = (e: any) => {
        const fov = getFov();
        camera.fov = clickZoom(fov, 'zoomIn');
        camera.updateProjectionMatrix();
    };

    zoomInButton?.addEventListener('click', zoomInFunction);

    const zoomOutFunction = (e: any) => {
        const fov = getFov();
        camera.fov = clickZoom(fov, 'zoomOut');
        camera.updateProjectionMatrix();
    };

    zoomOutButton?.addEventListener('click', zoomOutFunction);

    const clickZoom = (value: number, zoomType: string) => {
        if (value >= 20 && zoomType === 'zoomIn') {
            return value - 5;
        } else if (value <= 75 && zoomType === 'zoomOut') {
            return value + 5;
        } else {
            return value;
        }
    };

    const getFov = () => {
        return Math.floor(
            (2 *
                Math.atan(
                    camera.getFilmHeight() / 2 / camera.getFocalLength(),
                ) *
                180) /
                Math.PI,
        );
    };

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
