import { useState } from 'react';

import './styles.css';

import { Blueprint } from '../Blueprint';
import { PointZoom, PanoMarker, OnMarkerClick } from '../Blueprint/models';

const ZOOM_MIN_MAX = [1, 20];
const BG_COLOR = '#373737';

interface FloorPlanProps {
  bgImg: HTMLImageElement;
  markers: PanoMarker[];
  onMarkerClick: OnMarkerClick;

  selectedMarker?: PanoMarker;
}

export const MiniMap: React.FC<FloorPlanProps> = (props) => {
  const { bgImg, markers, onMarkerClick, selectedMarker } = props;

  const [zoom, setZoom] = useState<PointZoom | undefined>(undefined);
  const [isCollapsed, setIsCollapsed] = useState(true);

  function onZoomChanged(newZoom: PointZoom) {
    setZoom(newZoom);
  }

  const imgSrc = `/assets/icons/${isCollapsed ? 'up' : 'down'}.svg`;

  const header = (
    <div
      onClick={() => setIsCollapsed(!isCollapsed)}
      style={{ padding: '5px 0', background: BG_COLOR, height: '18px' }}
    >
      <span style={{ color: 'white', float: 'left' }}>Map</span>
      <div style={{ float: 'right', paddingRight: '5px' }}>
        <img src={imgSrc} alt='collapse-icon'></img>
      </div>
    </div>
  );

  const body = (
    <div
      style={{
        height: '180px',
        borderRadius: 5,
        overflow: 'hidden',
        background: 'white',
      }}
    >
      <Blueprint
        markers={markers}
        selectedMarker={selectedMarker}
        selectionType={'pin'}
        zoom={zoom}
        onZoomChanged={onZoomChanged}
        onMarkerClick={onMarkerClick}
        enableInitialZoomForSelectedMarker={true}
        enableCenterOnSelect={true}
        enablePanning={true}
        bgImg={bgImg}
      />
    </div>
  );

  const zoomDisplay = zoom == null ? '' : `${(zoom[0] * 100).toFixed()}%`;

  const footer = (
    <div
      style={{
        color: 'white',
        padding: '8px 0',
        background: BG_COLOR,
        height: '18px',
      }}
    >
      <span style={{ float: 'left' }}>{zoomDisplay}</span>
      <div style={{ float: 'right', display: 'flex', paddingRight: '5px' }}>
        <img
          onClick={() => zoom != null && setZoom(getZoomOutValue(zoom))}
          style={{ marginRight: '30px' }}
          src='/assets/icons/minus.svg'
          alt='zoom-in-icon'
        ></img>
        <img
          onClick={() => zoom != null && setZoom(getZoomInValue(zoom))}
          src='/assets/icons/add.svg'
          alt='zoom-out-icon'
        ></img>
      </div>
    </div>
  );

  return (
    <div
      className='mini-map'
      style={{
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        border: `5px solid ${BG_COLOR}`,
        borderRadius: '5px',
        width: '180px',
        background: BG_COLOR,
      }}
    >
      {header}
      {!isCollapsed && body}
      {!isCollapsed && footer}
    </div>
  );
};

function getZoomInValue(zoom: PointZoom): PointZoom {
  return [Math.min(Math.ceil(zoom[0] + 0.01), ZOOM_MIN_MAX[1]), 0, 0];
}

function getZoomOutValue(zoom: PointZoom): PointZoom {
  return [Math.max(Math.floor(zoom[0] - 0.01), ZOOM_MIN_MAX[0]), 0, 0];
}
