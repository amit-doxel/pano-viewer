import { fetchPanoramas } from '../utils/fetch-panoramas';
import { useState, useEffect } from 'react';
import { Panorama } from '../models/panorama';

export function useFetchGridPanos(projectId?: number, grid?: string) {
  const [gridPanos, setGridPanos] = useState<Panorama[]>([]);

  useEffect(() => {
    if (!projectId || grid == null) {
      return;
    }

    fetchPanoramas(projectId, { grid })
      .then((localGridPanos: Panorama[]) => {
        setGridPanos(localGridPanos);
      })
      .catch((err) => {
        console.error("useFetchGridPanos: coudln't fetch grid panos", err);
      });
  }, [projectId, grid]);

  return gridPanos;
}
