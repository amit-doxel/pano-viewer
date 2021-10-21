import { createContext } from 'react';

export interface ZoomMethods {
  zoomInMethod: () => any;
  zoomOutMethod: () => any;
}

export type ViewContextValue = {
  view: string;
  zoomMethods: ZoomMethods;
  setZoomMethods: (value: ZoomMethods) => any;
  setView: (view: string) => any;
};

export const ViewContext = createContext({
  view: 'single-pano',
  zoomMethods: { zoomInMethod: () => null, zoomOutMethod: () => null },
  setZoomMethods: (value: ZoomMethods) => null,
  setView: (view: string) => null,
});
