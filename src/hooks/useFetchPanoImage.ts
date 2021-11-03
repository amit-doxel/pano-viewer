import { useState, useEffect } from 'react';

export function fetchPanoImage(
  projectId: number,
  sceneId: number,
): Promise<{ link: string }> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas/scene_link?id=${sceneId}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  ).then((res) => res.json());
}

export function useFetchPanoImage(
  projectId?: number,
  panoId?: number,
): string | undefined {
  const [panoImage, setPanoImage] = useState<string | undefined>();

  useEffect(() => {
    if (!projectId || !panoId) {
      return;
    }

    fetchPanoImage(projectId, panoId)
      .then((res) => {
        setPanoImage(res.link);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, panoId]);

  return panoImage;
}
