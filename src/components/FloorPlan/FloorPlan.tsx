import {
  Blueprint,
  PanoMarker,
  OnMarkerClick,
  OnZoomChanged,
  PointZoom
} from '../Blueprint';

interface  FloorPlanProps {
  bgImg: HTMLImageElement;
  markers: PanoMarker[];
  zoom: PointZoom;

  onZoomChanged: OnZoomChanged;
  onMarkerClick: OnMarkerClick;

  selectedMarker ?: PanoMarker;
}

export const FloorPlan: React.FC<FloorPlanProps> = (props) => {

  const {
    bgImg,
    markers,
    onMarkerClick,
    zoom,
    selectedMarker,
  } = props

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{ width: '90%', height: '80%' }}
      >
        <Blueprint
          markers={markers}
          selectedMarker={selectedMarker}
          selectionType={'inner_circle'}
          enablePanning={true}
          onMarkerClick={onMarkerClick}
          bgImg={bgImg}
          zoom={zoom}
        />
      </div>
    </div>
  );
};
