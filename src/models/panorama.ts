// date format 2019-10-01 00:00:00+00
type DateTimeString = string;

export interface Panorama {
  id: number;
  gridId: number;
  scanDate: DateTimeString;
  singedUrl?: string;
  timestamp: number;
  x: number;
  y: number;
}
