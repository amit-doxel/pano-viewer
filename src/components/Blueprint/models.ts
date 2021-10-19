import { RefObject } from 'react';

type SelectionType = 'pin' | 'inner_circle';

export interface PanoMarker {
  id: number;
  x: number;
  y: number;
}

export interface BlueprintProps {
  bgImageUrl: string;
  markers: PanoMarker[];
  selectedMarker?: PanoMarker;

  selectionType?: SelectionType;

  enableSelectZoomPan?: boolean;

  onMarkerSelected?: (marker: PanoMarker) => void;
  onZoomChanged?: (zoom: number) => void;
}

export type UseBlueprintProps = BlueprintProps & {
  wrapperRef: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
};

export interface BlueprintRenderOpts {
  imgScaleFactor?: number;
  topImgOffset?: number;
  leftImgOffset?: number;
  selectionType?: SelectionType;

  circleColor?: string;
  circleRadius?: number;

  onMarkerSelected?: (marker: PanoMarker) => void;
  onZoomChanged?: (zoom: number) => void;
}
