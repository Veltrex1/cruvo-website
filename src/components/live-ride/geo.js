// Web Mercator helpers (MapLibre's 512 px tiles) for placing things on the pre-rendered map images.
const TILE = 512;
const mx = (lon) => (lon + 180) / 360;
const my = (lat) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
};

/** Pixel position of [lon, lat] inside a frame rendered at `frame.center` / `frame.zoom`. */
export function project([lon, lat], frame) {
  const world = TILE * 2 ** frame.zoom;
  return {
    x: (mx(lon) - mx(frame.center[0])) * world + frame.width / 2,
    y: (my(lat) - my(frame.center[1])) * world + frame.height / 2,
  };
}

const R = 6371008.8;
const rad = (d) => (d * Math.PI) / 180;

/** Great-circle distance in metres. */
export function distance([lon1, lat1], [lon2, lat2]) {
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
