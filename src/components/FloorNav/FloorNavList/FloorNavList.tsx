import React from 'react';

import { FloorNavListItem } from './FloorNavListItem';
import { Floor } from '../../../models/floor';
import { usePanoramaContext } from '../../../context/PanoramaContext/usePanoramaContext';

export const FloorNavList: React.FC = () => {
  const { floors, setSelectedFloor } = usePanoramaContext();

  function onFloorClick(floor: Floor) {
    if (!floor.scans.length) {
      return;
    }

    setSelectedFloor(floor);
  }

  const FloorList = floors.map((floor) => (
    <FloorNavListItem
      key={floor.id}
      isDisabled={floor.scans.length === 0}
      floor={floor}
      onClick={onFloorClick}
    />
  ));
  return <div>{FloorList}</div>;
};
