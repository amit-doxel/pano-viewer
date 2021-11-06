import { RefObject } from 'react';
import { fabric } from 'fabric';

export type FabricImage = fabric.Image;

type SelectionType = 'pin' | 'inner_circle';

export interface PanoMarker {
  id: number | string;
  x: number;
  y: number;
}

type ZoomValue = number;
export type PointZoom = [ZoomValue, number, number];

export type OnMarkerClick = (marker: PanoMarker) => void;
export type OnZoomChanged = (zoom: PointZoom) => void;

export interface BlueprintProps {
  bgImg: HTMLImageElement;
  markers: PanoMarker[];
  selectedMarker?: PanoMarker;

  selectionType?: SelectionType;

  zoom?: PointZoom;

  enableCenterOnSelect?: boolean;

  enableInitialZoomForSelectedMarker?: boolean;

  enablePanning?: boolean;

  onMarkerClick?: OnMarkerClick;
  onZoomChanged?: OnZoomChanged;
}

export type UseBlueprintProps = BlueprintProps & {
  wrapperRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
};

export interface ImgBlueprintRenderOpts {
  imgScaleFactor: number;
  topImgOffset: number;
  leftImgOffset: number;
}

export interface BlueprintRenderOpts {
  imgScaleFactor?: number;
  topImgOffset?: number;
  leftImgOffset?: number;
  selectionType?: SelectionType;

  circleColor?: string;
  circleRadius?: number;

  onMarkerClick?: OnMarkerClick;
  onZoomChanged?: OnZoomChanged;
}
