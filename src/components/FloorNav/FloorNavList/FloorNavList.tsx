import React from 'react';

import { FloorNavListItem } from './FloorNavListItem';
import { useFloorNavData } from '../../../hooks';

export const FloorNavList: React.FC = () => {
  const { floorNavData } = useFloorNavData();
  const FloorList = floorNavData?.map((floor) => (
    <FloorNavListItem key={floor.id} {...floor} />
  ));
  return <div>{FloorList}</div>;
};
