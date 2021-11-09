import { GridId, Grid } from "../models/grid";
import { Panorama } from "../models/panorama";

export function getGridId(panorama: Panorama) : GridId {
  const {grid: {x, y}} = panorama;
  return `${x},${y}`;
}

export function getGrids(panoramas: Panorama[]) : Grid[] {
  const {grids} =  panoramas.reduce((acc, panorama) => {
    const {map, grids} = acc;

    const {grid: {x, y}} = panorama;
    const gridId = getGridId(panorama);

    if (!map[gridId]) {
      const newGrid = {
        id: gridId,
        x,
        y,
        panoramas: [panorama]
      };
      map[gridId] = newGrid;
      grids.push(newGrid);
    } else {
      map[gridId].panoramas.push(panorama);
    }

    return {map, grids};

  }, {
    map: {} as {[key: string]: Grid},
    grids: [] as Grid[]
  });

  return grids;
}
