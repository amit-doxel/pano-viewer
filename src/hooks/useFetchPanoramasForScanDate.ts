// /panoramas?scan_id={id}"
import { useState, useEffect } from 'react';
import { Panorama } from '../models/panorama';
import { Grid } from '../models/grid';
import { fetchPanoramas } from '../utils/fetch-panoramas';

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

function getGrids(panoramas: Panorama[]): Grid[] {
  const { grids } = panoramas.reduce(
    (acc, panorama) => {
      const { map, grids } = acc;

      const {
        grid: { x, y },
      } = panorama;
      const gridId = `${x},${y}`;

      if (!map[gridId]) {
        const newGrid = {
          id: gridId,
          x,
          y,
          panoramas: [panorama],
        };
        map[gridId] = newGrid;
        grids.push(newGrid);
      } else {
        map[gridId].panoramas.push(panorama);
      }

      return { map, grids };
    },
    {
      map: {} as { [key: string]: Grid },
      grids: [] as Grid[],
    },
  );

  return grids;
}
