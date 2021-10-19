import { createContext } from 'react';

export type PanoramaContextValue = {
  currentFloor: string;
  currentScene: string;
  projectId: string;
  setCurrentFloor: (value: string) => any;
  setCurrentScene: (value: string) => any;
  setProjectId: (value: string) => any;
};

export const PanoramaContext = createContext({
  currentFloor: '1',
  currentScene: 'pano_image/second_image.jpg',
  projectId: '1',
  setCurrentFloor: (value: string) => null,
  setCurrentScene: (value: string) => null,
  setProjectId: (value: string) => null,
});
