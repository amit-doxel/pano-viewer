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

function useFetchPanoImage(projectId: number, sceneId: number) {
  const [panoImage, setPanoImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPanoImage(projectId, sceneId)
      .then((res) => {
        setPanoImage(res.link);
        setLoading(false);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, sceneId]);

  return {
    loading,
    panoImage,
  };
}

export default useFetchPanoImage;
