import { createContext } from 'react';

export type PanoramaContextValue = {
  currentFloor: number;
  projectId: number;
  buildingName: string;
  sceneId: number;
  setCurrentFloor: (value: number) => any;
  setProjectId: (value: number) => any;
  setBuildingName: (value: string) => any;
  setSceneId: (Value: number) => any;
};

export const PanoramaContext = createContext({
  currentFloor: 1,
  projectId: 17,
  buildingName: 'Prologis+Redlands',
  sceneId: 387662,
  setCurrentFloor: (value: number) => null,
  setProjectId: (value: number) => null,
  setBuildingName: (value: string) => null,
  setSceneId: (value: number) => null,
});
