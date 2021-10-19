import { useState } from 'react';
import Blueprint from '../Blueprint/Blueprint';
import {DEFAULT_MARKERS, IMG_URL} from '../Blueprint/constants';

export const MiniMap: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        width: '180px',
        height: '180px',
        backgroundColor: 'lightblue',
        borderRadius: 2,
      }}
      onClick={() => setCount(count + 1)}
    >
      <Blueprint
        markers={DEFAULT_MARKERS}
        selectedMarker={DEFAULT_MARKERS[count]}
        enableSelectZoomPan={true}
        bgImageUrl={IMG_URL}
        selectionType={'pin'}
      />
    </div>
  );
};
