import {useState} from 'react';
import BluePrint, {DEFAULT_MARKERS} from '../BluePrint/BluePrint';

export const FloorPlan: React.FC = () => {

  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => setCount(count + 1)}
    >
      <div
        style={{ width: '90%', height: '80%', backgroundColor: 'lightgrey' }}
      >
      <BluePrint
        markers={DEFAULT_MARKERS}
        selectedMarker={DEFAULT_MARKERS[count]}
        bgImageUrl={''}
      />
      </div>
    </div>
  );
};
