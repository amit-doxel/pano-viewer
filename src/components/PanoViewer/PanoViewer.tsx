import React from 'react';

import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { FloorNav } from '../FloorNav';

import { useCountRenders } from '../../hooks';
import { PanoVisContainer } from '../PanoVisContainer/PanoVisContainer';
import { DatePickerContextProvider } from '../../context/DatePickerContext/DatePickerContextProvider';

// NOTES:
// 1. Should have a PanoVisContainer component that can hold
// either PanoContainer or BluePrintContainer maped to diff routes
// 2. PanoContainer will have panorama renderer that takes
// the whole dims and the minimap
// 3. BluePrintContainer will have FloorPlan and MiniPano
export const PanoViewer: React.FC = () => {
  // debug info, will keep this react becomes stable
  useCountRenders('PanoViewer');

  return (
    <DatePickerContextProvider>
      <Header />
      <PanoVisContainer />
      <LeftBar />
      <FloorNav />
    </DatePickerContextProvider>
  );
};
