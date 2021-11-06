import { useState, useEffect } from 'react';
import { getData } from '../utils/get-data';
import { Panorama } from '../models/panorama';

export function useFetchGridPanos(projectId?: number, gridId?: number) {
  const [gridPanos, setGridPanos] = useState<Panorama[]>([]);

  useEffect(() => {
    if (!projectId || gridId == null) {
      return;
    }

    getData('panos_by_grid.json', 'json')
      .then((panosByGrid: Panorama[][]) => {
        setGridPanos(panosByGrid[gridId]);
      })
      .catch((err) => {
        console.error("useFetchGridPanos: coudln't fetch grid panos", err);
      });
  }, [projectId, gridId]);

  return gridPanos;
}
