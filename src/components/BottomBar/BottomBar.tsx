import { useViewContext } from '../../context/ViewContext/useViewContext';
import { PanoMarker } from '../Blueprint/models';
import { MiniMap } from '../MiniMap/MiniMap';
import React from 'react';
import { CalenderPicker } from '../CalenderPicker';

import { ZoomBar } from '../ZoomBar';
import { usePanoramaContext } from '../../context/PanoramaContext/usePanoramaContext';
import { View } from '../../context/ViewContext/models';
import './styles.css';

export interface BottomBarProp {
  zoomIn: any;
  zoomOut: any;
}

export const BottomBar: React.FC<BottomBarProp> = ({ zoomIn, zoomOut }) => {
  const { panoramas, selectedPanorama, setSelectedPanorama, blueprintImg } =
    usePanoramaContext();

  function onMarkerClick({ id: markerId }: PanoMarker) {
    const pano = panoramas.find(({ id }) => id === markerId);
    if (pano) {
      setSelectedPanorama(pano);
    }
  }

  const { view } = useViewContext();

  const shouldShowMinimap = blueprintImg != null && view !== View.FLOORPLAN;

  return (
    <div className='bottom-wrapper'>
      {shouldShowMinimap && (
        <MiniMap
          bgImg={blueprintImg}
          markers={panoramas}
          selectedMarker={selectedPanorama}
          onMarkerClick={onMarkerClick}
        />
      )}

      <CalenderPicker />
      <ZoomBar zoomIn={zoomIn} zoomOut={zoomOut}></ZoomBar>
    </div>
  );
};
