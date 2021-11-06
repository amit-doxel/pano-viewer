import React /*, { useCallback }*/ from 'react';

import { Floor } from '../../../models/floor';

import './styles.css';

interface FloorNavListItemAttrs {
  isDisabled: boolean;
  floor: Floor;
  onClick: (f: Floor) => void;
}

export const FloorNavListItem: React.FC<FloorNavListItemAttrs> = ({
  floor,
  isDisabled,
  onClick,
}) => {
  return (
    <div
      className={isDisabled ? 'disabled-nav-item' : 'floor-nav-item'}
      onClick={() => onClick(floor)}
    >
      {floor.name}
    </div>
  );
};
