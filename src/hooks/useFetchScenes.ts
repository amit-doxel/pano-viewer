import { useState, useEffect } from 'react';

function fetchScenes(
  projectId: number,
  dateStr: string,
  buildingName: string,
  floorId: number,
): Promise<[]> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas/scenes?date=${dateStr}&building_name=${buildingName}&floor=${floorId}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  ).then((res) => res.json());
}

function useFetchScenes(
  projectId: number,
  dateStr: string,
  buildingName: string,
  floorId: number,
) {
  const [scenes, setScenes] = useState<[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScenes(projectId, dateStr, buildingName, floorId)
      .then((res) => {
        setScenes(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, dateStr, buildingName, floorId]);

  return {
    loading,
    scenes,
  };
}

export default useFetchScenes;
