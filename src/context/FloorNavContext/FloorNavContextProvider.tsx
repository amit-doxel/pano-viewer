import React, { useState } from 'react';

import { FloorNavContext, FloorNavContextValue } from './FloorNavContext';

export const FloorNavContextProvider: React.FC = ({ children }) => {
    const [floorNav, setFloorNav] = useState(false);

    const context: FloorNavContextValue = {
        floorNav,
        setFloorNav,
    };

    return (
        <FloorNavContext.Provider value={context}>
            {children}
        </FloorNavContext.Provider>
    );
};
