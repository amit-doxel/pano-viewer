import { useEffect, useState } from 'react';

export interface PanoInfo {
  blueprint: string;
  building: {
    name: string;
    floor: number;
  };
  survey_date: string;
}

function fetchPanoInfo(
  projectId: number,
  dateStr: string,
): Promise<PanoInfo> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas?date=${dateStr}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  ).then((res) => res.json());
}

export function useFetchPanoInfo(projectId: number, dateStr: string) {
  const [panoInfo, setPanoInfo] = useState<PanoInfo | null>(null);

  useEffect(() => {
    fetchPanoInfo(projectId, dateStr)
      .then((panoInfo: PanoInfo) => {
        setPanoInfo(panoInfo)
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, dateStr]);

  return panoInfo;
}
