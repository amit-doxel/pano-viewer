import { fabric } from 'fabric';
import { ImgBlueprintRenderOpts } from './models';

export function isImagedFetched(img$: fabric.Image): boolean {
  return img$.get('width') !== 0 && img$.get('height') !== 0;
}

export function deriveMarkerRadius(img$: fabric.Image) {
  return (
    Math.min(img$.getScaledWidth() || 0, img$.getScaledHeight() || 0) * 0.01
  );
}

export function derivePathWidth(img$: fabric.Image) {
  return (
    Math.min(img$.getScaledWidth() || 0, img$.getScaledHeight() || 0) * 0.003
  );
}

export function getFabricImageScaleFactor(img$: fabric.Image) {
  return Math.sqrt(
    (img$.getScaledHeight() * img$.getScaledWidth()) /
      (img$.height! * img$.width!),
  );
}

export function getBlueprintRenderOptsFromImg(
  img$: fabric.Image,
): ImgBlueprintRenderOpts {
  const imgScaleFactor = getFabricImageScaleFactor(img$);
  const topImgOffset = img$.get('top') || 0;
  const leftImgOffset = img$.get('left') || 0;

  return {
    imgScaleFactor,
    topImgOffset,
    leftImgOffset,
  };
}

export function addImageToCanvas(canvas$: fabric.Canvas, img$: fabric.Image) {
  const canvasWidth = canvas$.width || 1;
  const canvasHeight = canvas$.height || 1;

  resizeOffsetBlueprintImage(img$, canvasWidth, canvasHeight);

  img$.lockMovementY = true;
  img$.lockMovementX = true;

  canvas$.add(img$);
}

export function resizeOffsetBlueprintImage(
  img$: fabric.Image,
  containerWidth: number,
  containerHeight: number,
): fabric.Image {
  const imgWidth = img$.get('width') || 1;
  const imgHeight = img$.get('height') || 1;

  const shouldScaleToWidth =
    containerHeight / imgHeight > containerWidth / imgWidth;

  if (shouldScaleToWidth) {
    img$.scaleToWidth(containerWidth);

    const heightToWidthRatio = imgHeight / imgWidth;
    const scaledImgHeight = containerWidth * heightToWidthRatio;
    const topImgOffset = (containerHeight - scaledImgHeight) / 2;

    img$.set({ top: topImgOffset });
  } else {
    img$.scaleToHeight(containerHeight);

    const widthToHeightRatio = imgWidth / imgHeight;
    const scaledImgWidth = containerHeight * widthToHeightRatio;

    const leftImgOffset = (containerWidth - scaledImgWidth) / 2;

    img$.set({ left: leftImgOffset });
  }

  return img$;
}

export function getImageFromUrl(imgUrl: string): Promise<HTMLImageElement> {
  return getFabricImageFromUrl(imgUrl).then((img$) => {
    return img$.getElement() as HTMLImageElement;
  });
}

export function getFabricImageFromUrl(imgUrl: string): Promise<fabric.Image> {
  return new Promise((res, rej) => {
    fabric.Image.fromURL(imgUrl, (img$: fabric.Image) => {
      if (isImagedFetched(img$)) {
        res(img$);
      } else {
        rej(
          new Error(
            'Image.fromURL: Could not fetch blueprint image. Check network tab',
          ),
        );
      }
    });
  });
}
