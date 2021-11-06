import { useEffect, useState } from 'react';
import { Floor, APIFloor } from '../models';
import { API_SERVER_BASE_URL } from '../utils/constants';

function fetchFloors(projectId: number): Promise<Floor[]> {
  return fetch(`${API_SERVER_BASE_URL}/projects/${projectId}/floors`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((floors: APIFloor[]) => {
      return floors.map((floor) => {
        const { blueprint_signed_url, ...floorParams } = floor;
        return {
          ...floorParams,
          blueprintSignedUrl: blueprint_signed_url,
        };
      });
    });
}

export function useFetchFloors(projectId: number) {
  const [floors, setFloors] = useState<Floor[]>([]);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    fetchFloors(projectId)
      .then((localFloors) => {
        setFloors(localFloors);
      })
      .catch((err) => {
        console.error(
          `useFetchFloors: couldn't fetch floors for project with id ${projectId}`,
          err,
        );
      });
  }, [projectId]);

  return floors;
}
