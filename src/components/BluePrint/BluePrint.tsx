import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const imgUrl = "https://storage.googleapis.com/prod-doxel-projects/FB-VLL-B6-2020/design/blueprints/FB-B6.png?GoogleAccessId=doxel-storage-admin%40doxel-prod.iam.gserviceaccount.com&Expires=1634508044&Signature=varDCylQxG%2B9eaH3akZFG5GXdD0R7cLk1Dpb58Bxz2%2FEb0YnN0FSFpUH%2FxUlSzRzotfYliYmj%2F8o8UM4Q0EaZACx4c%2FogvteagDbhnz9Y3F1KeC5F2eINq%2Bu%2FaLp1krQXOG7CdFJ3f6voFNFMHQ9QzlorYaPLnJdFTES7sneMCjoXFoWM96IAw6l8K7CQOUP8GNd7avD6JB94MgUxUTrPPvj5Tivqm3qUBGh%2BZFLDLx4ar6Bhr2GOjz9nu0VP%2BmF6AesOpmalMubNngF0A%2FQx8yubJyXcyLS8DdobWOewq5%2FC7LRapPzbrIt4cYWGLZFGJltb3MIdVJfGiE0lM6GJA%3D%3D";

const BluePrint: React.FC = () => {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const {clientWidth, clientHeight} = wrapperRef.current

    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const opts = {
      containerWidth: clientWidth,
      containerHeight: clientHeight
    };

    const canvas$ = new fabric.Canvas(canvas, {selection: false});

    initBlueprint(canvas$, imgUrl, opts);
  }, []);

  return <div
    ref={wrapperRef}
    style={{ position: 'relative', display: 'block', width: '100%', height: '100%', backgroundColor: 'lightblue', borderRadius: 2}}
  >
    <canvas ref={canvasRef}></canvas>
  </div>;
}


function initBlueprint (
  canvas$: fabric.Canvas,
  bpURL: string,
  {
    containerWidth,
    containerHeight
  } : {
    containerWidth: number;
    containerHeight: number;
  },
  //cb?: () => void
) {
  fabric.Image.fromURL(bpURL, function(img: fabric.Image) {

    const imgWidth = img.get('width') || 1;
    const imgHeight = img.get('height') || 1;

    const widthToHeightRatio = imgWidth / imgHeight;

        const isLandscape = widthToHeightRatio > 1;

        let topImgOffset;

        if (isLandscape) {
          img.scaleToWidth(containerWidth);

          const heightToWidthRatio = imgHeight / imgWidth;
          const scaledImgHeight = containerWidth * heightToWidthRatio;
          topImgOffset = ( containerHeight - scaledImgHeight ) / 2;

          img.set({top: topImgOffset});
        } else {
          console.warn("WARNING: Horizonal Initial image offseting is not implemented yet")
          img.scaleToHeight(containerHeight);
        }

        img.lockMovementY = true;
        img.lockMovementX = true;

        canvas$.add(img);

        //cb && cb(img, topImgOffset);

  }, {
    borderColor: 'red',
    hasBorders: true,
    hasControls: false,
    hasRotatingPoint: false
  });
}

export default BluePrint;
