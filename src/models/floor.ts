export type URLString = string;

export interface Floor {
  id: number;
  name: string;
  blueprintSignedUrl: URLString;
  scans: {
    date: string;
  }[];
}
