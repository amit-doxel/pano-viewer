// DateStr format: "2021-10-26"
type DateStr = string;
type URLStr = string;
// GridStr format: "10,10"
type GridStr = string;

export interface Panorama {
  id: number;
  grid: { x: number; y: number };
  signedUrl?: string;
  timestamp: number;
  scanDate: DateStr;
}

export interface APIPanorama {
  id: number;
  signed_url?: URLStr;
  scan_date: DateStr;
  grid: { x: number; y: number };
  timestamp: number;
}

export interface FetchPanoramasOpts {
  scanDate?: DateStr;
  grid?: GridStr;
}
