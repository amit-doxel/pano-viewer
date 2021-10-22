import React, {useState, useEffect} from 'react';

import { FloorPlan } from '../FloorPlan';
import { MiniMap } from '../MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';
import { Arrow } from '../Arrow';

import { useScene, useCountRenders } from '../../hooks';
import { useIdentity } from '../../hooks/useIdentity';
import { useFetchBlueprintFabricImage } from '../../hooks/useFetchBlueprintImage';

import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useViewContext } from '../../context/ViewContext/useViewContext';

import { DEFAULT_MARKERS, PanoMarker, PointZoom } from '../Blueprint';

const FLOORPLAN_ZOOM_MIN_MAX = [1, 20];

// NOTES:
// 1. Should have a PanoVisContainer component that can hold
// either PanoContainer or BluePrintContainer maped to diff routes
// 2. PanoContainer will have panorama renderer that takes
// the whole dims and the minimap
// 3. BluePrintContainer will have FloorPlan and MiniPano
export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { user } = useIdentity();
  const { scene, camera } = useScene();
  const { view, zoomMethods } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  const [ selectedMarker, setSelectedMarker ] = useState<PanoMarker>(DEFAULT_MARKERS[0]);
  const [ floorPlanZoom, setFloorPlanZoom ] = useState<PointZoom>([1, 0, 0]);

  let localZoomInFn, localZoomOutFn;

  if (view === 'blueprint-view') {
    localZoomInFn = () => {
      setFloorPlanZoom(getZoomInValue(floorPlanZoom))
    };
    localZoomOutFn = () => {
      setFloorPlanZoom(getZoomOutValue(floorPlanZoom))
    };
  } else {
    localZoomInFn = zoomInMethod;
    localZoomOutFn = zoomOutMethod;
  }

  useEffect(() => {
    if (view !== 'blueprint-view') {
      return;
    }

    setFloorPlanZoom([1, 0, 0]);
  },[view]);

  function onZoomChanged(zoom: PointZoom) {
    setFloorPlanZoom(zoom);
  }

  const img = useFetchBlueprintFabricImage(20, '2021-10-14');

  //if (!user) return null;

  const selectedView =
    view === 'single-pano' ? (
      <>
        <ThreeCanvas scene={scene} camera={camera} />
        <Arrow />
      </>
    ) : (
      img && <FloorPlan
        bgImg={img}
        markers={DEFAULT_MARKERS}
        selectedMarker={selectedMarker}
        onMarkerClick={(marker) => setSelectedMarker(marker)}
        zoom={floorPlanZoom}
        onZoomChanged={onZoomChanged}
      />
    );

  const hasMinimap = true;//['single-pano'].includes(view);

  return (
    <FloorNavContextProvider>
      <Header />
      {selectedView}
      <LeftBar />
      {hasMinimap && img != null && <MiniMap
        bgImg={img}
        markers={DEFAULT_MARKERS}
        selectedMarker={selectedMarker}
        onMarkerClick={(marker) => setSelectedMarker(marker)}
      />}
      <FloorNav />
      <BottomBar zoomIn={localZoomInFn} zoomOut={localZoomOutFn} />
    </FloorNavContextProvider>
  );
};

function getZoomInValue(zoom: PointZoom) : PointZoom {
  return [ Math.min(Math.ceil(zoom[0] + 0.01), FLOORPLAN_ZOOM_MIN_MAX[1]), 0, 0 ];
}


function getZoomOutValue(zoom: PointZoom) : PointZoom {
  return [ Math.max(Math.floor(zoom[0] - 0.01), FLOORPLAN_ZOOM_MIN_MAX[0]), 0, 0 ];
}
