import { createContext } from 'react';
import { Panorama } from '../../models/panorama';
import { Floor } from '../../models';

export type PanoramaContextValue = {
  projectId: number;
  currentScene?: string;
  buildingName: string;
  selectedDateStr?: string;
  floors: Floor[];
  selectedFloor?: Floor;
  blueprintImg?: HTMLImageElement;
  panoramas: Panorama[];
  gridPanoramas: Panorama[];
  selectedPanorama?: Panorama;
  selectNextPanorama: () => void;
  selectPrevPanorama: () => void;
  setSelectedDateStr: (s: string) => void;
  setProjectId: (value: number) => any;
  setBuildingName: (value: string) => any;
  setSelectedPanorama: (pm: Panorama) => void;
  setSelectedFloor: (f: Floor) => void;
};

export const PanoramaContext = createContext({
  projectId: 17,
  buildingName: 'Prologis+Redlands',
  setProjectId: (value: number) => null,
  setBuildingName: (value: string) => null,
  floors: [] as Floor[],
  panoramas: [] as Panorama[],
  gridPanoramas: [] as Panorama[],
  setSelectedPanorama: (p: Panorama) => {},
  selectNextPanorama: () => {},
  selectPrevPanorama: () => {},
  setSelectedDateStr: (s: string) => {},
  setSelectedFloor: (f: Floor) => {},
});
