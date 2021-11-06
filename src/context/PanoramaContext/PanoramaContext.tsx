import { createContext } from 'react';
import { Panorama } from '../../models/panorama';
import { Floor } from '../../models';
import { Grid } from '../../models/grid';

export type PanoramaContextValue = {
  projectId: number;
  currentScene?: string;
  buildingName: string;
  selectedDateStr?: string;
  floors: Floor[];
  selectedFloor?: Floor;
  blueprintImg?: HTMLImageElement;
  panoramas: Panorama[];
  grids: Grid[];
  selectedGrid?: Grid;
  gridPanoramas: Panorama[];
  selectedPanorama?: Panorama;
  selectNextPanorama: () => void;
  selectPrevPanorama: () => void;
  setSelectedDateStr: (s: string) => void;
  setProjectId: (value: number) => any;
  setBuildingName: (value: string) => any;
  setSelectedPanorama: (pm: Panorama) => void;
  setSelectedFloor: (f: Floor) => void;
  setSelectedGrid: (f: Grid) => void;
  onDateChange: (date: string, panorama?: Panorama) => void;
};

export const PanoramaContext = createContext({
  projectId: 17,
  buildingName: 'Prologis+Redlands',
  setProjectId: (value: number) => null,
  setBuildingName: (value: string) => null,
  floors: [] as Floor[],
  panoramas: [] as Panorama[],
  grids: [] as Grid[],
  gridPanoramas: [] as Panorama[],
  setSelectedPanorama: (p: Panorama) => {},
  selectNextPanorama: () => {},
  selectPrevPanorama: () => {},
  setSelectedDateStr: (s: string) => {},
  setSelectedFloor: (f: Floor) => {},
  setSelectedGrid: (f: Grid) => {},
  onDateChange: (date: string, panorama?: Panorama) => {},
});
