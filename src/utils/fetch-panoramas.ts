import { FetchPanoramasOpts, Panorama, APIPanorama } from '../models/panorama';
import { API_SERVER_BASE_URL } from './constants';

export function fetchPanoramas(
  projectId: number,
  opts: FetchPanoramasOpts = {} as FetchPanoramasOpts,
): Promise<Panorama[]> {
  let url = `${API_SERVER_BASE_URL}/panoramas?project_id=${projectId}`;

  const { scanDate, grid } = opts;

  if (scanDate) {
    url += `&scan_date=${scanDate}`;
  }

  if (grid) {
    url += `&grid=${grid}`;
  }

  return fetch(url, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((panoramas: APIPanorama[]) => {
      return panoramas.map((panorama) => {
        const { signed_url, scan_date, ...panoParams } = panorama;
        return {
          ...panoParams,
          signedUrl: signed_url,
          scanDate: scan_date,
        };
      });
    });
}
