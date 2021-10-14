import { createContext } from 'react';

export type CurrentFloorSceneContextValue = {
  currentFloor: string;
  currentScene: string;
  projectId: string;
  setCurrentFloor: (value: string) => any;
  setCurrentScene: (value: string) => any;
  setProjectId: (value: string) => any;
};

export const CurrentFloorSceneContext = createContext({
  currentFloor: '1',
  currentScene: 'pano_image/second_image.jpg',
  projectId: '1',
  setCurrentFloor: (value: string) => null,
  setCurrentScene: (value: string) => null,
  setProjectId: (value: string) => null,
});
