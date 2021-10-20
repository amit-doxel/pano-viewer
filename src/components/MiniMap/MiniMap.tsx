import { useState } from 'react';

import Blueprint from '../Blueprint/Blueprint';
import { DEFAULT_MARKERS, IMG_URL } from '../Blueprint/constants';
import './styles.css';

export const MiniMap: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='mini-map' onClick={() => setCount(count + 1)}>
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
