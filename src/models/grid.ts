import { Panorama } from './panorama';
// format `${panorama.grid.x},${panorama.grid.y}` or "10,10"
export type GridId = string;

export interface Grid {
  id: GridId;
  x: number;
  y: number;
  panoramas: Panorama[];
}
