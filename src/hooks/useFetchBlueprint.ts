import {useEffect, useState} from 'react';

function fetchBlueprintImgUrl(
  projectId: number,
  dateStr: string
) : Promise<{blueprint: string}> {
  return fetch(`http://localhost:3000/api/v2/projects/${projectId}/panoramas?date=${dateStr}`, {
    method: 'GET',
    credentials: 'include'
  }).then((res) => res.json());
}

export function useFetchBlueprint(
  projectId: number,
  dateStr: string
) {

  const [blueprintUrl, setBlueprintUrl] = useState<string>();

  useEffect(() => {
    fetchBlueprintImgUrl(projectId, dateStr)
      .then((res) => {
        setBlueprintUrl(res.blueprint);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, dateStr]);

  return blueprintUrl;
}
