import { useState } from 'react';

import './styles.css';

import { Blueprint } from '../Blueprint';
import { PointZoom, PanoMarker, OnMarkerClick } from '../Blueprint/models';

const ZOOM_MIN_MAX = [1, 20];

interface  FloorPlanProps {
  bgImg: HTMLImageElement;
  markers: PanoMarker[];
  onMarkerClick: OnMarkerClick;

  selectedMarker ?: PanoMarker;
}

export const MiniMap: React.FC<FloorPlanProps> = (props) => {

  const {
    bgImg,
    markers,
    onMarkerClick,
    selectedMarker,
  } = props

  const [zoom, setZoom] = useState<PointZoom | undefined>(undefined);
  const [isCollapsed, setIsCollapsed] = useState(true);

  function onZoomChanged(newZoom: PointZoom) {
    setZoom(newZoom);
  }

  const body = (
    <div style={{
      height: '180px',
      borderRadius: 5,
      overflow: 'hidden'
    }}>
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
    <div style={{ color: 'white', padding: '8px 0', background: 'black', height: '18px'}}>
      <span>
        {zoomDisplay}
      </span>
      <div style={{float: 'right', display: 'flex'}}>
        <img onClick={() => zoom != null && setZoom(getZoomOutValue(zoom))} style={{marginRight: '30px'}} src='/assets/icons/minus.svg' alt='zoom-in-icon'></img>
        <img onClick={() => zoom != null && setZoom(getZoomInValue(zoom))} src='/assets/icons/add.svg' alt='zoom-out-icon'></img>
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
        border: '5px solid black',
        borderRadius: '5px',
        width: '180px',
        background: 'white'
      }}
    >
      <div onClick={() => setIsCollapsed(!isCollapsed)} style={{padding: '5px 0', background: 'black'}}>
        <span style={{color: 'white'}}>Map</span>
        <div style={{float: 'right'}}>
          <img src='/assets/icons/down.svg' alt='collapse-icon'></img>
        </div>
      </div>
      {!isCollapsed && body}
      {!isCollapsed && footer}
    </div>
  );
};


function getZoomInValue(zoom: PointZoom) : PointZoom {
  return [ Math.min(Math.ceil(zoom[0] + 0.01), ZOOM_MIN_MAX[1]), 0, 0 ];
}


function getZoomOutValue(zoom: PointZoom) : PointZoom {
  return [ Math.max(Math.floor(zoom[0] - 0.01), ZOOM_MIN_MAX[0]), 0, 0 ];
}
