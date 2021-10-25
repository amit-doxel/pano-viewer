import React, {useState, useEffect} from 'react';

import { FloorPlan } from '../FloorPlan';
import { MiniMap } from '../MiniMap';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';
import { Arrow } from '../Arrow';

import { useScene, useCountRenders, useFloorplanZoom, useFetchMarkers } from '../../hooks';
import { useFetchBlueprintImage } from '../../hooks/useFetchBlueprintImage';

import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';
import { useViewContext, View } from '../../context/ViewContext';

import { PanoMarker } from '../Blueprint';

const PROJECT_ID = 20;
const DATE_STR = '2021-05-14';

// NOTES:
// 1. Should have a PanoVisContainer component that can hold
// either PanoContainer or BluePrintContainer maped to diff routes
// 2. PanoContainer will have panorama renderer that takes
// the whole dims and the minimap
// 3. BluePrintContainer will have FloorPlan and MiniPano
export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');
  const { scene, camera } = useScene();
  const { view, zoomMethods } = useViewContext();
  const { zoomInMethod, zoomOutMethod } = zoomMethods;

  const [ selectedMarker, setSelectedMarker ] = useState<PanoMarker | undefined>();

  const {
    zoom: floorplanZoom,
    onZoomChanged: onFloorplanZoomChanged,
    zoomInMethod: floorplanZoomInFn,
    zoomOutMethod: floorplanZoomOutFn,
  } = useFloorplanZoom(view);

  let localZoomInFn, localZoomOutFn;

  if (view === View.FLOORPLAN) {
    localZoomInFn = floorplanZoomInFn;
    localZoomOutFn = floorplanZoomOutFn;
  } else {
    localZoomInFn = zoomInMethod;
    localZoomOutFn = zoomOutMethod;
  }

  const img = useFetchBlueprintImage(PROJECT_ID, DATE_STR);

  const markers = useFetchMarkers(PROJECT_ID, DATE_STR);

  useEffect(() => {

    if (!markers.length) {
      return;
    }

    setSelectedMarker(markers[0]);

  }, [markers]);

  const selectedView =
    view === View.SINGLE_PANO ? (
      <>
        <ThreeCanvas scene={scene} camera={camera} />
        <Arrow />
      </>
    ) : (
      img && <FloorPlan
        bgImg={img}
        markers={markers}
        selectedMarker={selectedMarker}
        onMarkerClick={(marker) => setSelectedMarker(marker)}
        zoom={floorplanZoom}
        onZoomChanged={onFloorplanZoomChanged}
      />
    );

  const hasMinimap = [View.SINGLE_PANO].includes(view);

  return (
    <FloorNavContextProvider>
      <Header />
      {selectedView}
      <LeftBar />
      {hasMinimap && img != null && <MiniMap
        bgImg={img}
        markers={markers}
        selectedMarker={selectedMarker}
        onMarkerClick={(marker) => setSelectedMarker(marker)}
      />}
      <FloorNav />
      <BottomBar zoomIn={localZoomInFn} zoomOut={localZoomOutFn} />
    </FloorNavContextProvider>
  );
};
