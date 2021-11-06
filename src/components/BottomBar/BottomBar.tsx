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
  const { blueprintImg, grids, selectedGrid, setSelectedGrid } =
    usePanoramaContext();

  function onMarkerClick({ id: markerId }: PanoMarker) {
    const grid = grids.find(({ id }) => id === markerId);
    if (grid) {
      setSelectedGrid(grid);
    }
  }

  const { view } = useViewContext();

  const shouldShowMinimap = blueprintImg != null && view !== View.FLOORPLAN;

  return (
    <div className='bottom-wrapper'>
      {shouldShowMinimap && (
        <MiniMap
          bgImg={blueprintImg}
          markers={grids}
          selectedMarker={selectedGrid}
          onMarkerClick={onMarkerClick}
        />
      )}

      <CalenderPicker />
      <ZoomBar zoomIn={zoomIn} zoomOut={zoomOut}></ZoomBar>
    </div>
  );
};
