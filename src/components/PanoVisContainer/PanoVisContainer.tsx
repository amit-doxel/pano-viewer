import React from 'react';

import { PanoContainer } from '../PanoContainer';

import { useViewContext, View } from '../../context/ViewContext';
import { BluePrintContainer } from '../BluePrintContainer/BluePrintContainer';

export const PanoVisContainer: React.FC = () => {
  const { view } = useViewContext();

  return view === View.SINGLE_PANO ? <PanoContainer /> : <BluePrintContainer />;
};
