import { createContext } from 'react';

export type PanoramaContextValue = {
  currentFloor: number;
  projectId: number;
  currentScene: string;
  buildingName: string;
  sceneId: number;
  setCurrentScene: (value: string) => any;
  setCurrentFloor: (value: number) => any;
  setProjectId: (value: number) => any;
  setBuildingName: (value: string) => any;
  setSceneId: (Value: number) => any;
};

export const PanoramaContext = createContext({
  currentFloor: 1,
  projectId: 17,
  currentScene: 'pano-image/R0140102.JPG',
  buildingName: 'Prologis+Redlands',
  sceneId: 387662,
  setCurrentFloor: (value: number) => null,
  setProjectId: (value: number) => null,
  setCurrentScene: (value: string) => null,
  setBuildingName: (value: string) => null,
  setSceneId: (value: number) => null,
});
