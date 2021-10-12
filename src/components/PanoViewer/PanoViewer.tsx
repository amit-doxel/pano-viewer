import React from 'react';

import { ThreeCanvas } from '../ThreeCanvas';
import { BottomBar } from '../BottomBar';
import { LeftBar } from '../LeftBar';
import { Header } from '../Header';
import { Loader } from '../Loader';
import { FloorNav } from '../FloorNav';

import { useScene, useCountRenders } from '../../hooks';
import { FloorNavContextProvider } from '../../context/FloorNavContext/FloorNavContextProvider';

export const PanoViewer: React.FC = () => {
    // debug info, will keep this react becomes stable
    useCountRenders('PanoViewer');
    const { scene, camera, loading } = useScene();

    if (loading) return <Loader />;
    return (
        <FloorNavContextProvider>
            <Header />
            <ThreeCanvas scene={scene} camera={camera} />
            <LeftBar />
            <FloorNav />
            <BottomBar />
        </FloorNavContextProvider>
    );
};
