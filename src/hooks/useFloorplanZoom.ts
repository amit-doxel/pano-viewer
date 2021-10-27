import { useEffect, useState } from 'react';
import { View } from '../context/ViewContext';
import { PointZoom } from '../components/Blueprint';
import { FLOORPLAN_ZOOM_MIN_MAX } from '../components/FloorPlan/constants';

export const useFloorPlanZoom = (view: View) => {
  const [floorPlanZoom, setFloorPlanZoom] = useState<PointZoom>([1, 0, 0]);

  useEffect(() => {
    if (view !== View.FLOORPLAN) {
      return;
    }

    setFloorPlanZoom([1, 0, 0]);
  }, [view]);

  function onZoomChanged(zoom: PointZoom) {
    setFloorPlanZoom(zoom);
  }

  return {
    zoom: floorPlanZoom,
    onZoomChanged,
    zoomInMethod: () => {
      setFloorPlanZoom(getFloorplanZoomInValue(floorPlanZoom));
    },
    zoomOutMethod: () => {
      setFloorPlanZoom(getFloorplanZoomOutValue(floorPlanZoom));
    },
  };
};

function getFloorplanZoomInValue(zoom: PointZoom): PointZoom {
  return [Math.min(Math.ceil(zoom[0] + 0.01), FLOORPLAN_ZOOM_MIN_MAX[1]), 0, 0];
}

function getFloorplanZoomOutValue(zoom: PointZoom): PointZoom {
  return [
    Math.max(Math.floor(zoom[0] - 0.01), FLOORPLAN_ZOOM_MIN_MAX[0]),
    0,
    0,
  ];
}
