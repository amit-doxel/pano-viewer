import { MiniPano } from '../MiniPano/MiniPano';
import {
  Blueprint,
  PanoMarker,
  OnMarkerClick,
  OnZoomChanged,
  PointZoom,
} from '../Blueprint';

interface FloorPlanProps {
  bgImg: HTMLImageElement;
  markers: PanoMarker[];
  zoom: PointZoom;

  onZoomChanged: OnZoomChanged;
  onMarkerClick: OnMarkerClick;

  selectedMarker?: PanoMarker;
}

export const FloorPlan: React.FC<FloorPlanProps> = (props) => {
  const { bgImg, markers, onMarkerClick, zoom, selectedMarker, onZoomChanged } =
    props;

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
      <div style={{ width: '90%', height: '80%' }}>
        <Blueprint
          markers={markers}
          selectedMarker={selectedMarker}
          selectionType={'inner_circle'}
          enablePanning={true}
          onMarkerClick={onMarkerClick}
          onZoomChanged={onZoomChanged}
          bgImg={bgImg}
          zoom={zoom}
        />
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '100px',
            right: '30px',
            top: '25%',
          }}
        >
          <MiniPano />
        </div>
      </div>
    </div>
  );
};
