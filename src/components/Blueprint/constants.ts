export const MOUSE_DOWN_EVENT = 'mouse:down';
export const MOUSE_UP_EVENT = 'mouse:up';
export const MOUSE_MOVE_EVENT = 'mouse:move';
export const MOUSE_WHEEL_EVENT = 'mouse:wheel';

export const MARKER_RADIUS = 5; // default value
export const MARKER_COLOR = '#19ACCC';
export const MARKER_SELECT_INNER_CIRCLE_COLOR = '#454A4B';

export const WALK_PATH_COLOR = '#009BD0'; // default value
export const WALK_PATH_WIDTH = 1;

export const DEFAULT_SELECTION_TYPE = 'inner_circle';

export const ZOOM_IN_MAX = 20;

export const PIN_PATH = 'M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z';

export const CANVAS_OPTS = {
  borderColor: 'transparent',
  hasBorders: false,
  hasControls: false,
  hasRotatingPoint: false,
  lockRotation: true,
  selectable: false
};

export const BLUEPRINT_RENDER_OPTS_INIT_STATE = {
  imgScaleFactor: 0,
  topImgOffset: 0,
  leftImgOffset: 0,
  selectionType: 'inner_circle' as 'inner_circle',

  circleColor: MARKER_COLOR,
  circleRadius: MARKER_RADIUS,
};

export const PATH_DEFAULT_OPTIONS = {
  fill: 'transparent',
  stroke: WALK_PATH_COLOR,
  strokeWidth: WALK_PATH_WIDTH,

  borderColor: 'transparent',
  hasBorders: false,
  hasControls: false,
  hasRotatingPoint: false,
  lockRotation: true,
  selectable: false
}

export const MARKER_DEFAULT_OPTIONS = {
  radius: MARKER_RADIUS,
  fill: MARKER_COLOR,
  strokeWidth: 0,
  hasBorders: false,
  hasControls: false,
  hasRotatingPoint: false,
  lockMovementY: true,
  lockMovementX: true,
  selectable: false,
  hoverCursor: 'pointer'
};
