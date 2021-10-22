import { useEffect, useState } from 'react';
import { PanoMarker } from "../components/Blueprint/models";
import { useFetchPanoInfo } from "./useFetchPanoInfo";

interface SceneData {
  id: number;
  mapped_x: number;
  mapped_y: number;
}


function fetchMarkers(
  projectId: number,
  dateStr: string,
  buildingName: string,
  floor: number
): Promise<SceneData[]> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas/scenes?date=${dateStr}&building_name=${buildingName}&floor=${floor}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  ).then((res) => res.json());
}

export function useFetchMarkers(projectId: number, dateStr: string) {

  const {building} = useFetchPanoInfo(projectId, dateStr) || {};
  const {name, floor} = building || {};

  const [markers, setMarkers] = useState<PanoMarker[]>([]);

  useEffect(() => {

    if (!projectId || !dateStr || !name || !floor) {
      return;
    }

    fetchMarkers(projectId, dateStr, name, floor)
      .then((scenes: SceneData[]) => {
        return getPanoMarkers(scenes);
      })
      .then((markers: PanoMarker[]) => {
        return setMarkers(markers);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, dateStr, name, floor]);

  return markers;
}

function getPanoMarkers(scenes: SceneData[]) : PanoMarker[] {
  return scenes.map(({id, mapped_x: x, mapped_y: y}) => {
    return {id, x, y}
  });
}
