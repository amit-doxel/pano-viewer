// /panoramas?scan_id={id}"
import { useState, useEffect } from 'react';
import { useFetchPanoInfo } from './useFetchPanoInfo';
import { Panorama } from '../models/panorama';

interface RinconScene {
  id: number;
  mapped_x: number;
  mapped_y: number;
  timestamp: number;
}

function fetchRinconScenes(
  projectId: number,
  dateStr: string,
  buildingName: string,
  floor: number,
): Promise<RinconScene[]> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas/scenes?date=${dateStr}&building_name=${buildingName}&floor=${floor}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  ).then((res) => res.json());
}

export function useFetchPanoramasForScanDate(
  projectId?: number,
  scanDate?: string,
) {
  //NOTE: useFetchPanoInfo is needed to be able to fetch panos from Rincon
  const { building } = useFetchPanoInfo(projectId, scanDate) || {};
  const { name, floor } = building || {};

  const [panos, setPanos] = useState<Panorama[]>([]);

  useEffect(() => {
    if (!projectId || !scanDate || !name || !floor) {
      return;
    }

    fetchRinconScenes(projectId, scanDate, name, floor)
      .then((scenes: RinconScene[]) => {
        return getPanoramas(scenes, scanDate);
      })
      .then((panos: Panorama[]) => {
        return setPanos(panos);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, scanDate, name, floor]);

  return panos;
}

function getPanoramas(scenes: RinconScene[], scanDate: string): Panorama[] {
  return scenes.map((scene: RinconScene, gridId) => {
    const { id, mapped_x: x, mapped_y: y, timestamp } = scene;

    return {
      id,
      gridId,
      scanDate,
      timestamp,
      x,
      y,
    };
  });
}
