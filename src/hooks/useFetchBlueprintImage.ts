import { useEffect, useState } from 'react';
import { getImageFromUrl } from '../components/Blueprint';

function fetchBlueprintImgUrl(
  projectId: number,
  dateStr: string,
): Promise<{ blueprint: string }> {
  return fetch(
    `http://localhost:3000/api/v2/projects/${projectId}/panoramas?date=${dateStr}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  ).then((res) => res.json());
}

export function useFetchBlueprintImage(projectId: number, dateStr: string) {
  const [img, setImg] = useState<HTMLImageElement | undefined>();

  useEffect(() => {
    fetchBlueprintImgUrl(projectId, dateStr)
      .then((res) => {
        return res.blueprint;
      })
      .then((blueprintURL) => {
        return getImageFromUrl(blueprintURL);
      })
      .then((img: HTMLImageElement) => {
        setImg(img);
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, [projectId, dateStr]);

  return img;
}
