import React from 'react';

import { ZoomBar } from '../ZoomBar';
import './styles.css';

export interface BottomBarProp {
  zoomIn: any;
  zoomOut: any;
}

export const BottomBar: React.FC<BottomBarProp> = ({ zoomIn, zoomOut }) => {
  return (
    <div className='bottom-wrapper'>
      <ZoomBar zoomIn={zoomIn} zoomOut={zoomOut}></ZoomBar>
    </div>
  );
};
