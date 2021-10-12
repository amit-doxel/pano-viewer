import { createContext } from 'react';

export type FloorNavContextValue = {
    floorNav: boolean;
    setFloorNav: (value: boolean) => any;
};

export const FloorNavContext = createContext({
    floorNav: false,
    setFloorNav: (value: boolean) => null,
});
