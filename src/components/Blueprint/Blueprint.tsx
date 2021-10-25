import { useRef, RefObject } from 'react';

import useBlueprint from './useBlueprint';
import { BlueprintProps } from './models';
import './styles.css';

export const Blueprint: React.FC<BlueprintProps> = (props) => {
  const wrapperRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useBlueprint({
    ...props,
    wrapperRef,
    canvasRef,
  });

  return (
    <div ref={wrapperRef} className='blueprint-wrapper'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
