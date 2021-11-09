import { useState, useEffect } from 'react';
import { Panorama } from '../models/panorama';
import { Grid } from '../models/grid';
import { fetchPanoramas } from '../utils/fetch-panoramas';
import { getGrids } from "../utils/grids";

export function useFetchPanoramasForScanDate(
  projectId?: number,
  scanDate?: string,
) {
  const [panos, setPanos] = useState<Panorama[]>([]);
  const [grids, setGrids] = useState<Grid[]>([]);

  useEffect(() => {
    if (!projectId || !scanDate) {
      return;
    }

    fetchPanoramas(projectId, { scanDate })
      .then((panos: Panorama[]) => {
        const grids = getGrids(panos);
        setGrids(grids);
        setPanos(panos);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, scanDate]);

  return {
    grids,
    setGrids,
    panoramas: panos,
  };
}
