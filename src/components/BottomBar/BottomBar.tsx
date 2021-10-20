import React from 'react';

import { ZoomBar } from '../ZoomBar';
import './styles.css';

export const BottomBar: React.FC = () => {
  return (
    <div className='bottom-wrapper'>
      <ZoomBar></ZoomBar>
    </div>
  );
};
