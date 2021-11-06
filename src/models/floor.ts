type URLString = string;
// DateStr format: "2021-10-26"
type DateStr = string;

export interface Floor {
  id: number;
  name: string;
  blueprintSignedUrl: URLString;
  scans: DateStr[];
}

export interface APIFloor {
  id: number;
  name: string;
  blueprint_signed_url: URLString;
  scans: DateStr[];
}
