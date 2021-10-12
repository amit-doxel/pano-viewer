import * as THREE from 'three';

const SPEED_FACTOR = 0.01;

export class CameraMouseControls {
    private _camera: THREE.Camera;
    private _canvas: HTMLCanvasElement;
    private _mousePressed: boolean;
    private _rpy: THREE.Vector3;

    constructor(camera: THREE.Camera, canvas: HTMLCanvasElement) {
        this._camera = camera;
        this._canvas = canvas;
        this._mousePressed = false;
        this._rpy = new THREE.Vector3(0, 0, 0);
        this.initEventListeners();
    }

    private initEventListeners() {
        const onMousedown = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            this._mousePressed = true;
        };

        this._canvas.addEventListener('mousedown', onMousedown, false);

        const onMousemove = (event: any) => {
            if (this._mousePressed) {
                const { dx, dy } = this.getMouseXYmovement(event);
                this.setCameraOrientation(dx, dy);
            }
        };

        this._canvas.addEventListener('mousemove', onMousemove, false);

        const onMouseup = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            this._mousePressed = false;
        };
        this._canvas.addEventListener('mouseup', onMouseup, false);

        this._canvas.addEventListener('mouseleave', onMouseup, false);

        // Disabling right mouse click to open context menu
        const onContextmenu = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
        };
        this._canvas.addEventListener('contextmenu', onContextmenu, false);
    }

    private setCameraOrientation(dx: number, dy: number) {
        this._rpy.y -= dy * SPEED_FACTOR;
        this._rpy.z -= dx * SPEED_FACTOR;

        // Yaw, and then pitch
        this._camera.quaternion.setFromEuler(
            new THREE.Euler(0, -this._rpy.z, 0, 'XYZ'),
        );

        let newPitch = Math.PI + this._rpy.y;
        if (newPitch > (3 * Math.PI) / 2) {
            newPitch = (3 * Math.PI) / 2;
        }
        if (newPitch < Math.PI / 2) {
            newPitch = Math.PI / 2;
        }

        const temp = new THREE.Quaternion();
        temp.setFromEuler(new THREE.Euler(newPitch, 0, 0, 'XYZ'));
        this._camera.quaternion.multiply(temp);

        // expose the rotation vector for convenience
        this._camera.rotation.setFromQuaternion(
            this._camera.quaternion,
            this._camera.rotation.order,
        );
    }

    private getMouseXYmovement(event: MouseEvent) {
        return { dx: event.movementX || 0, dy: event.movementY || 0 };
    }
}
