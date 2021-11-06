import { useEffect, useState } from 'react';
import { getData } from '../utils/get-data';
import { Floor } from '../models';

function fetchBlueprintImgUrl(
  projectId: number,
  dateStr: string,
): Promise<string> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas?date=${dateStr}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )
    .then((res) => res.json())
    .then((res) => {
      return res.blueprint;
    });
}

export function useFetchFloors(projectId: number) {
  const [floors, setFloors] = useState<Floor[]>([]);

  useEffect(() => {
    if (!projectId) {
      return;
    }

    getData('floors.json', 'json')
      .then()
      .then((localFloors: Floor[]) => {
        const blueprints$ = localFloors.map(({ scans }) => {
          return fetchBlueprintImgUrl(projectId, scans[0].date);
        });

        return Promise.all(blueprints$).then<[Floor[], string[]]>(
          (blueprints) => {
            return [localFloors, blueprints];
          },
        );
      })
      .then(([localFloors, blueprints]) => {
        blueprints.forEach((blueprintSignedUrl, idx) => {
          localFloors[idx].blueprintSignedUrl = blueprintSignedUrl;
        });

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
