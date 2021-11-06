import { Panorama } from './panorama';

export interface Grid {
  id: string;
  x: number;
  y: number;
  panoramas: Panorama[];
}
