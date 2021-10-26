import React from 'react';

import { PanoContainer } from '../PanoContainer';

import { useViewContext, View } from '../../context/ViewContext';
import { BluePrintContainer } from '../BluePrintContainer/BluePrintContainer';

export const PanoVisContainer: React.FC = () => {
  const { view } = useViewContext();

  if (view === View.SINGLE_PANO) return <PanoContainer />;
  else return <BluePrintContainer />;
};
