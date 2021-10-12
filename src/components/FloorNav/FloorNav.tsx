import React from 'react';

import { useFloorNavContext } from '../../context/FloorNavContext/useFloorNavContext';
import './styles.css';

export const FloorNav: React.FC = () => {
    const { floorNav } = useFloorNavContext();
    if (floorNav) {
        return (
            <div className='floor-nav-wrapper'>
                <div className='bar-theme floor-nav'>
                    <div className='nav-item'>Floor 1</div>
                    <div className='nav-item'>Floor 2</div>
                    <div className='nav-item'>Floor 3</div>
                    <div className='nav-item'>Underground</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                    <div className='nav-item'>Floor</div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
