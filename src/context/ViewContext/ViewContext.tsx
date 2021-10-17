import { createContext } from 'react';

export type ViewContextValue = {
  view: string;
  setView: (view: string) => any;
};

export const ViewContext = createContext({
  view: 'single-pano',
  setView: (view: string) => null,
});
