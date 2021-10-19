import { useRef, RefObject } from 'react';
import useBlueprint from './useBlueprint';
import { BlueprintProps } from './models';

const Blueprint: React.FC<BlueprintProps> = (props) => {
  const wrapperRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useBlueprint({
    ...props,
    wrapperRef,
    canvasRef,
  });

  return (
    <div
      ref={wrapperRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: 'lightblue',
        borderRadius: 2,
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Blueprint;
