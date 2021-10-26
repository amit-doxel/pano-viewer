import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

import {
  UseBlueprintProps,
  BlueprintRenderOpts,
  PanoMarker,
  PointZoom,
} from './models';

import {
  MOUSE_DOWN_EVENT,
  MOUSE_UP_EVENT,
  MOUSE_MOVE_EVENT,
  MOUSE_OUT_EVENT,
  MOUSE_WHEEL_EVENT,
  MARKER_RADIUS,
  MARKER_COLOR,
  MARKER_SELECT_INNER_CIRCLE_COLOR,
  DEFAULT_SELECTION_TYPE,
  ZOOM_IN_MAX,
  PIN_PATH,
  CANVAS_OPTS,
  IMG_OPTS,
  BLUEPRINT_RENDER_OPTS_INIT_STATE,
  PATH_DEFAULT_OPTIONS,
  MARKER_DEFAULT_OPTIONS,
} from './constants';

import {
  deriveMarkerRadius,
  derivePathWidth,
  getFabricImageScaleFactor,
  getBlueprintRenderOptsFromImg,
  addImageToCanvas,
} from './fabricImageUtils';

const useBlueprint = (props: UseBlueprintProps): void => {
  const {
    wrapperRef,
    canvasRef,
    bgImg,
    markers,
    selectedMarker,
    selectionType,
    zoom,
    enableInitialZoomForSelectedMarker,
    enableCenterOnSelect,
    enablePanning,

    onMarkerClick,
    onZoomChanged,
  } = props;

  const [canvas$, setCanvas$] = useState<fabric.Canvas | null>(null);
  const [bgImg$, setBGImg$] = useState<fabric.Image | null>(null);
  const [markers$, setMarkers$] = useState<fabric.Circle[]>([]);

  // set canvas and bg image
  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const { clientWidth, clientHeight } = wrapperRef.current;

    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    if (!bgImg) {
      return;
    }

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const canvas$ = new fabric.Canvas(canvas, CANVAS_OPTS);

    setCanvas$(canvas$);

    const img$ = new fabric.Image(bgImg, IMG_OPTS);

    setBGImg$(img$);

    addImageToCanvas(canvas$, img$);

    if (enablePanning) {
      enableCanvasPanning(canvas$);
    }

    return () => {
      cleanUpPanEvents(canvas$);
      canvas$.clear();
    };
  }, [bgImg, wrapperRef, canvasRef, enablePanning]);

  // handle marker and path rendering
  useEffect(() => {
    if (!canvas$ || !bgImg$ || !markers) {
      return;
    }

    const markerRadius = deriveMarkerRadius(bgImg$);

    const pathWidth = derivePathWidth(bgImg$);

    const blueprintRenderOpts = getBlueprintRenderOptsFromImg(bgImg$);

    addWalkPathToCanvas(canvas$, markers, pathWidth, blueprintRenderOpts);

    const markers$ = addMarkersToCanvas(canvas$, markers, {
      ...blueprintRenderOpts,
      onMarkerClick,
      circleRadius: markerRadius,
    });

    setMarkers$(markers$);
  }, [canvas$, bgImg$, markers, onMarkerClick]);

  // handle wheel zooming
  useEffect(() => {
    if (!canvas$) {
      return;
    }

    enableZoom(canvas$, (zoom) => {
      onZoomChanged && onZoomChanged(zoom);

      if (!bgImg$ || !selectedMarker || !enableCenterOnSelect) {
        return;
      }

      const { imgScaleFactor, topImgOffset, leftImgOffset } =
        getBlueprintRenderOptsFromImg(bgImg$);

      centerCanvasAroundMarker(
        canvas$,
        selectedMarker,
        imgScaleFactor,
        leftImgOffset,
        topImgOffset,
      );
    });

    return () => {
      cleanUpZoomEvents(canvas$);
    };
  }, [canvas$, selectedMarker, bgImg$, onZoomChanged, enableCenterOnSelect]);

  // logic that zooms into to a marker and centers the viewport if zoom is not set
  // and enableInitialZoomForSelectedMarker is enabled
  useEffect(() => {
    if (!canvas$ || !bgImg$ || zoom != null) {
      return;
    }

    const markerRadius = deriveMarkerRadius(bgImg$);

    // if radiusRatioToViewport set to 0.03 the zoom level will be set to a value that if applied
    // makes half of the marker ( radius ) take 3% of the Math.min(canvas$.width!, canvas$.height!)
    const radiusRatioToViewport = 0.03;
    const localZoom =
      (radiusRatioToViewport * Math.min(canvas$.width!, canvas$.height!)) /
      markerRadius;

    const hasZoomChanged = zoom !== localZoom;

    if (hasZoomChanged && enableInitialZoomForSelectedMarker) {
      canvas$.setZoom(localZoom);

      if (!selectedMarker) {
        return;
      }

      const imgScaleFactor = getFabricImageScaleFactor(bgImg$);
      const topImgOffset = bgImg$.get('top') || 0;
      const leftImgOffset = bgImg$.get('left') || 0;

      centerCanvasAroundMarker(
        canvas$,
        selectedMarker,
        imgScaleFactor,
        leftImgOffset,
        topImgOffset,
      );

      handleBorderConstraints(canvas$);

      onZoomChanged &&
        onZoomChanged([localZoom, selectedMarker.x, selectedMarker.y]);
    }
  }, [
    canvas$,
    bgImg$,
    zoom,
    enableInitialZoomForSelectedMarker,
    onZoomChanged,
  ]);

  // handle marker selection
  useEffect(() => {
    if (!selectedMarker || !bgImg$ || !canvas$) {
      return;
    }

    const markerRadius = deriveMarkerRadius(bgImg$);

    const blueprintRenderOpts = {
      imgScaleFactor: getFabricImageScaleFactor(bgImg$),
      topImgOffset: bgImg$.get('top'),
      leftImgOffset: bgImg$.get('left'),
      circleRadius: markerRadius * 0.7,
      selectionType: selectionType,
    };

    selectMarker(canvas$, selectedMarker, blueprintRenderOpts);
  }, [selectedMarker, bgImg$, canvas$, selectionType, markers$]);

  //handle centering viewport around marker on selection change if enabled
  useEffect(() => {
    if (!selectedMarker || !bgImg$ || !canvas$ || !enableCenterOnSelect) {
      return;
    }

    const imgScaleFactor = getFabricImageScaleFactor(bgImg$);
    const topImgOffset = bgImg$.get('top') || 0;
    const leftImgOffset = bgImg$.get('left') || 0;

    centerCanvasAroundMarker(
      canvas$,
      selectedMarker,
      imgScaleFactor,
      leftImgOffset,
      topImgOffset,
    );

    handleBorderConstraints(canvas$);
  }, [selectedMarker, bgImg$, canvas$, enableCenterOnSelect]);

  // handle zoom passed as a parameter
  useEffect(() => {
    if (!bgImg$ || !canvas$ || !zoom) {
      return;
    }

    if (zoom[0] === canvas$.getZoom()) {
      return;
    }

    canvas$.zoomToPoint({ x: zoom[1], y: zoom[2] }, zoom[0]);

    if (selectedMarker && enableCenterOnSelect) {
      const imgScaleFactor = getFabricImageScaleFactor(bgImg$);
      const topImgOffset = bgImg$.get('top') || 0;
      const leftImgOffset = bgImg$.get('left') || 0;

      centerCanvasAroundMarker(
        canvas$,
        selectedMarker,
        imgScaleFactor,
        leftImgOffset,
        topImgOffset,
      );
    }

    handleBorderConstraints(canvas$);
  }, [canvas$, zoom, bgImg$, enableCenterOnSelect, selectedMarker]);
};

function addWalkPathToCanvas(
  canvas$: fabric.Canvas,
  markers: PanoMarker[],
  pathWidth: number,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
): void {
  const imgScaleFactor = opts?.imgScaleFactor || 1;
  const topImgOffset = opts?.topImgOffset || 0;
  const leftImgOffset = opts?.leftImgOffset || 0;

  const path$ = getFromCanvasCache(canvas$, 'WALK_PATH');

  if (path$) {
    canvas$.remove(path$);
  }

  const pathStr = markers.reduce((acc, { x, y }) => {
    return (
      acc +
      ` ${x * imgScaleFactor + leftImgOffset} ${
        y * imgScaleFactor + topImgOffset
      }`
    );
  }, 'M');

  const newPath$ = new fabric.Path(pathStr, {
    ...PATH_DEFAULT_OPTIONS,
    strokeWidth: pathWidth,
  });

  setCanvasCache(canvas$, 'WALK_PATH', newPath$);

  canvas$.add(newPath$);
}

function addMarkersToCanvas(
  canvas$: fabric.Canvas,
  markers: PanoMarker[],
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
): fabric.Circle[] {
  const onMarkerClick = opts?.onMarkerClick;

  const markers$ = getFromCanvasCache(canvas$, 'MARKERS') || [];

  markers$.forEach((marker$: fabric.Circle) => {
    canvas$.remove(marker$);
  });

  const newMarkers$: fabric.Circle[] = [];

  markers.forEach((marker) => {
    const circle$ = addCircleToCanvas(canvas$, marker, opts);

    newMarkers$.push(circle$);

    circle$.on('mouseup', () => {
      if (onMarkerClick) {
        onMarkerClick(marker);
      }
    });
  });

  setCanvasCache(canvas$, 'MARKERS', newMarkers$);

  return newMarkers$;
}

function enableZoom(
  canvas$: fabric.Canvas,
  onZoomChanged?: (zoom: PointZoom) => void,
): void {
  canvas$.on(MOUSE_WHEEL_EVENT, function (event$: fabric.IEvent<WheelEvent>) {
    handleZoomEvent(canvas$, event$);

    handleBorderConstraints(canvas$);

    if (onZoomChanged) {
      const { offsetX, offsetY } = event$.e;
      onZoomChanged([canvas$.getZoom(), offsetX, offsetY]);
    }

    event$.e.preventDefault();
    event$.e.stopPropagation();
  });
}

function enableCanvasPanning(canvas$: fabric.Canvas) {
  let isPanning = false;

  canvas$.on(MOUSE_DOWN_EVENT, () => {
    isPanning = true;
  });

  canvas$.on(MOUSE_UP_EVENT, () => {
    isPanning = false;
  });

  canvas$.on(MOUSE_OUT_EVENT, (e) => {
    //NOTE: this event also fires for objects on the canvas
    //this checks if mouseout event happend for the canvas
    if (!('nextTarget' in e)) {
      isPanning = false;
    }
  });

  canvas$.on(MOUSE_MOVE_EVENT, (event$: fabric.IEvent<MouseEvent>) => {
    if (!isPanning) return;

    const moveX = event$.e.movementX;
    const moveY = event$.e.movementY;

    const canvasViewportTransform = canvas$.viewportTransform!;

    const leftViewPortOffset = canvasViewportTransform[4];
    const topViewPortOffset = canvasViewportTransform[5];

    const newCanvasXOffset = leftViewPortOffset + moveX;
    const newCanvasYOffset = topViewPortOffset + moveY;

    const zoom = canvas$.getZoom();

    const canvasWidthOfZoom = canvas$.width! * (zoom - 1);
    const canvasHeightOfZoom = canvas$.height! * (zoom - 1);

    const canDoHorizonMove =
      newCanvasXOffset < 0 && Math.abs(newCanvasXOffset) < canvasWidthOfZoom;
    const canDoVertMove =
      newCanvasYOffset < 0 && Math.abs(newCanvasYOffset) < canvasHeightOfZoom;

    const movePoint = new fabric.Point(
      canDoHorizonMove ? moveX : 0,
      canDoVertMove ? moveY : 0,
    );

    canvas$.relativePan(movePoint);
  });
}

function cleanUpZoomEvents(canvas$: fabric.Canvas): void {
  canvas$.off(MOUSE_WHEEL_EVENT);
}

function cleanUpPanEvents(canvas$: fabric.Canvas): void {
  canvas$.off(MOUSE_DOWN_EVENT);
  canvas$.off(MOUSE_UP_EVENT);
  canvas$.off(MOUSE_MOVE_EVENT);
}

function addCircleToCanvas(
  canvas$: fabric.Canvas,
  marker: PanoMarker,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
): fabric.Circle {
  const imgScaleFactor = opts?.imgScaleFactor || 1;
  const topImgOffset = opts?.topImgOffset || 0;
  const leftImgOffset = opts?.leftImgOffset || 0;
  const circleColor = opts?.circleColor || MARKER_COLOR;
  const circleRadius = opts?.circleRadius || MARKER_RADIUS;

  const { x, y } = marker;
  const circle$ = new fabric.Circle({
    left: x * imgScaleFactor - circleRadius + leftImgOffset,
    top: y * imgScaleFactor + topImgOffset - circleRadius,
    ...MARKER_DEFAULT_OPTIONS,
    radius: circleRadius,
    fill: circleColor,
  });

  canvas$.add(circle$);

  return circle$;
}

function selectMarker(
  canvas$: fabric.Canvas,
  marker: PanoMarker,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
) {
  const selectionType = opts?.selectionType || DEFAULT_SELECTION_TYPE;

  if (selectionType === 'pin') {
    addPinSelector(canvas$, marker, opts);
  } else {
    addInnerCircleSelector(canvas$, marker, opts);
  }
}

function handleZoomEvent(
  canvas$: fabric.Canvas,
  event$: fabric.IEvent<WheelEvent>,
): void {
  let newZoom = getZoomFromMouseWheelEvent(canvas$, event$);

  const { offsetX, offsetY } = event$.e;

  canvas$.zoomToPoint({ x: offsetX, y: offsetY }, newZoom);
}

// make sure canvas viewport stays within constraints
function handleBorderConstraints(canvas$: fabric.Canvas): void {
  const zoom = canvas$.getZoom();

  const canvasViewportTransform = canvas$.viewportTransform!;

  const leftViewPortOffset = canvasViewportTransform[4];
  const topViewPortOffset = canvasViewportTransform[5];

  const canvasWidthOfZoom = canvas$.width! * (zoom - 1);
  const canvasHeightOfZoom = canvas$.height! * (zoom - 1);

  let offsetXValue;

  if (leftViewPortOffset > 0) {
    // viewport goes beyound left border
    offsetXValue = 0;
  } else if (
    leftViewPortOffset < 0 &&
    Math.abs(leftViewPortOffset) > canvasWidthOfZoom
  ) {
    // viewport goes beyound right border
    offsetXValue =
      leftViewPortOffset + (Math.abs(leftViewPortOffset) - canvasWidthOfZoom);
  } else {
    // viewport is within left and right borders
    offsetXValue = leftViewPortOffset;
  }

  let offsetYValue;

  if (topViewPortOffset > 0) {
    // viewport goes beyound top border
    offsetYValue = 0;
  } else if (
    topViewPortOffset < 0 &&
    Math.abs(topViewPortOffset) > canvasHeightOfZoom
  ) {
    // viewport goes beyound bottom border
    offsetYValue =
      topViewPortOffset + (Math.abs(topViewPortOffset) - canvasHeightOfZoom);
  } else {
    // viewport is within top and down borders
    offsetYValue = topViewPortOffset;
  }

  const newVeiewportTranform = [
    ...canvasViewportTransform.slice(0, 4),
    offsetXValue,
    offsetYValue,
  ];

  canvas$.setViewportTransform(newVeiewportTranform);
}

function addPinSelector(
  canvas$: fabric.Canvas,
  marker: PanoMarker,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
): void {
  const lastPin$ = getFromCanvasCache(canvas$, 'PIN_MARKER');

  if (lastPin$) {
    canvas$.remove(lastPin$);
  }

  const newPin$ = addPinToCanvas(canvas$, marker, opts);

  setCanvasCache(canvas$, 'PIN_MARKER', newPin$);
}

function addInnerCircleSelector(
  canvas$: fabric.Canvas,
  marker: PanoMarker,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
): void {
  const circleRadius = opts?.circleRadius || MARKER_RADIUS * 0.7;

  const lastPin$ = getFromCanvasCache(canvas$, 'PIN_MARKER');

  if (lastPin$) {
    canvas$.remove(lastPin$);
  }

  const circle$ = addCircleToCanvas(canvas$, marker, {
    ...opts,
    circleRadius,
    circleColor: MARKER_SELECT_INNER_CIRCLE_COLOR,
  });

  setCanvasCache(canvas$, 'PIN_MARKER', circle$);
}

function getZoomFromMouseWheelEvent(
  canvas$: fabric.Canvas,
  e: fabric.IEvent<WheelEvent>,
) {
  const delta = e.e.deltaY;
  const zoom = canvas$.getZoom();
  const zoomBy = 0.999 ** delta;
  let newZoom = zoom * zoomBy;

  if (newZoom > ZOOM_IN_MAX) newZoom = ZOOM_IN_MAX;

  if (newZoom < 1) newZoom = 1;

  return newZoom;
}

function getFromCanvasCache(canvas$: fabric.Canvas, key: string) {
  return (canvas$ as { [key: string]: any })[`__cached__${key}`];
}

function addPinToCanvas(
  canvas$: fabric.Canvas,
  marker: PanoMarker,
  opts: BlueprintRenderOpts = BLUEPRINT_RENDER_OPTS_INIT_STATE,
): fabric.Path {
  const imgScaleFactor = opts?.imgScaleFactor || 1;
  const topImgOffset = opts?.topImgOffset || 0;
  const leftImgOffset = opts?.leftImgOffset || 0;
  const circleRadius = opts?.circleRadius || 1;

  const pin$ = new fabric.Path(PIN_PATH);
  pin$.scaleToHeight(circleRadius * 10);

  const { x, y } = marker;

  const left = x * imgScaleFactor + leftImgOffset - pin$.getScaledWidth() / 2;
  const top = y * imgScaleFactor + topImgOffset - pin$.getScaledHeight();

  pin$.set({
    left,
    top,
  });

  canvas$.add(pin$);

  return pin$;
}

function setCanvasCache(canvas$: fabric.Canvas, key: string, value: any): void {
  (canvas$ as { [key: string]: any })[`__cached__${key}`] = value;
}

function centerCanvasAroundMarker(
  canvas$: fabric.Canvas,
  selectedMarker: PanoMarker,
  imgScaleFactor: number,
  leftImgOffset: number,
  topImgOffset: number,
): void {
  const zoom = canvas$.getZoom();

  const x = (selectedMarker.x * imgScaleFactor! + leftImgOffset) * zoom;
  const y = (selectedMarker.y * imgScaleFactor! + topImgOffset) * zoom;

  const leftOffset = x - canvas$.width! / 2;
  const topOffset = y - canvas$.height! / 2;

  const canvasViewportTransform = canvas$.viewportTransform!;

  const newVeiewportTranform = [
    ...canvasViewportTransform.slice(0, 4),
    -leftOffset,
    -topOffset,
  ];

  canvas$.setViewportTransform(newVeiewportTranform);

  //Make sure we stay within borders
  handleBorderConstraints(canvas$);
}

export default useBlueprint;
