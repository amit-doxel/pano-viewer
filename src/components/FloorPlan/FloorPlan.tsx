import { useState } from 'react';
import Blueprint from '../Blueprint/Blueprint';
import {DEFAULT_MARKERS, IMG_URL} from '../Blueprint/constants';

export const FloorPlan: React.FC = () => {
  const [count] = useState(0);

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
        style={{ width: '90%', height: '80%', backgroundColor: 'lightgrey' }}
      >
        <Blueprint
          markers={DEFAULT_MARKERS}
          selectedMarker={DEFAULT_MARKERS[count]}
          bgImageUrl={IMG_URL}
          selectionType={'inner_circle'}
        />
      </div>
    </div>
  );
};
