import { createContext } from 'react';
import { View } from './models';

export interface ZoomMethods {
  zoomInMethod: () => any;
  zoomOutMethod: () => any;
}

export type ViewContextValue = {
  view: View;
  zoomMethods: ZoomMethods;
  setZoomMethods: (value: ZoomMethods) => any;
  setView: (view: View) => void;
};

export const ViewContext = createContext({
  view: View.SINGLE_PANO,
  zoomMethods: { zoomInMethod: () => null, zoomOutMethod: () => null },
  setZoomMethods: (value: ZoomMethods) => null,
  setView: (view: View) => {},
});
