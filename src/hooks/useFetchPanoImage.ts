import { useState, useEffect } from 'react';
import { APIPanorama, Panorama } from '../models/panorama';
import { API_SERVER_BASE_URL } from '../utils/constants';

function fetchPanoramaDetails(id: number): Promise<Panorama> {
  return fetch(`${API_SERVER_BASE_URL}/panoramas/${id}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((panorama: APIPanorama) => {
      const { signed_url, scan_date, ...panoParams } = panorama;
      return {
        ...panoParams,
        signedUrl: signed_url,
        scanDate: scan_date,
      };
    });
}

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

export function useFetchPanoImage(panoId?: number): string | undefined {
  const [panoImage, setPanoImage] = useState<string | undefined>();

  useEffect(() => {
    if (!panoId) {
      return;
    }

    fetchPanoramaDetails(panoId)
      .then((pano) => {
        setPanoImage(pano.signedUrl!);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [panoId]);

  return panoImage;
}
