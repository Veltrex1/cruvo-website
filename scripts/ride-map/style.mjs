// Turns OpenFreeMap's "liberty" style into the quiet topographic look used by the
// "Live on the move" section: pale land, sage forests, muted water, white roads, terrain.
const LAND = '#EEEBE2';
const FOREST = '#C4D1AE';
const FOREST_EDGE = '#B7C6A3';
const PARK = '#D3DCC3';
const WATER = '#ADC4D0';
const ROAD = '#FFFFFF';
const CASING = '#CDC8B7';
const LABEL = '#3B4442';
const MUTED = '#6E7770';

const DROP = /^(poi_|building|road_one_way|aeroway|airport|highway-name|natural_earth|landuse_(pitch|track|hospital|school|cemetery)|road_area_pattern|label_(state|country|city_capital)|boundary)/;
const HAND_LABELLED = ['Nashville', 'Beanblossom'];
const KEEP_HAMLETS = ['Beanblossom', 'Helmsburg', 'Gnaw Bone', 'Belmont', 'Taggart', 'Clarksdale', 'Trevlac'];

export function rideStyle(liberty, { demUrl, labels = [] }) {
  const style = structuredClone(liberty);
  delete style.sources.ne2_shaded;
  style.sources.dem = { type: 'raster-dem', tiles: [demUrl], encoding: 'terrarium', tileSize: 256, maxzoom: 13 };

  const layers = [];
  for (const layer of style.layers) {
    if (DROP.test(layer.id) || layer.source === 'ne2_shaded') continue;
    const p = (layer.paint ||= {});
    const l = (layer.layout ||= {});
    const id = layer.id;

    if (id === 'background') p['background-color'] = LAND;
    else if (id === 'park') { p['fill-color'] = PARK; p['fill-opacity'] = 0.55; }
    else if (id === 'park_outline') { p['line-color'] = FOREST_EDGE; p['line-opacity'] = 0.5; p['line-dasharray'] = [2, 2]; }
    else if (id === 'landuse_residential') { p['fill-color'] = '#E3DFD3'; p['fill-opacity'] = 0.7; }
    else if (id === 'landcover_wood') { p['fill-color'] = FOREST; p['fill-opacity'] = 0.95; p['fill-outline-color'] = FOREST_EDGE; }
    else if (id === 'landcover_grass') { p['fill-color'] = '#DCE2CC'; p['fill-opacity'] = 0.6; }
    else if (id === 'landcover_wetland') { p['fill-color'] = '#D2DCCB'; p['fill-opacity'] = 0.5; }
    else if (id === 'water') p['fill-color'] = WATER;
    else if (id.startsWith('waterway') && layer.type === 'line') { p['line-color'] = WATER; }
    else if (/casing$/.test(id) && layer.type === 'line') { p['line-color'] = CASING; }
    else if (layer.type === 'line' && /^(road|bridge|tunnel)_(minor|service_track|link|street|secondary_tertiary|trunk_primary|motorway|motorway_link|path_pedestrian)$/.test(id)) {
      p['line-color'] = id.includes('path') ? '#F7F5EF' : ROAD;
    } else if (/rail/.test(id) && layer.type === 'line') { p['line-color'] = '#C9C5BA'; }
    else if (id === 'label_village' || id === 'label_town' || id === 'label_city') {
      // Towns the route runs through are labelled by hand (offset from the road) instead.
      layer.filter = ['all', layer.filter ?? true, ['!', ['in', ['get', 'name'], ['literal', HAND_LABELLED]]]];
      p['text-color'] = LABEL; p['text-halo-color'] = 'rgba(236,233,223,0.9)'; p['text-halo-width'] = 1.6;
      l['text-font'] = ['Noto Sans Bold']; l['text-size'] = 15; l['text-transform'] = 'none';
    } else if (id === 'label_other') {
      layer.filter = ['all', ['==', ['get', 'class'], 'hamlet'], ['in', ['get', 'name'], ['literal', KEEP_HAMLETS.filter((n) => !HAND_LABELLED.includes(n))]]];
      p['text-color'] = MUTED; p['text-halo-color'] = 'rgba(236,233,223,0.9)'; p['text-halo-width'] = 1.4;
      l['text-font'] = ['Noto Sans Regular']; l['text-size'] = 11.5; l['text-transform'] = 'none'; l['text-letter-spacing'] = 0.02;
    } else if (layer.type === 'symbol' && /water/.test(id)) {
      p['text-color'] = '#5D7F92'; p['text-halo-color'] = 'rgba(236,233,223,0.8)';
      l['text-font'] = ['Noto Sans Italic']; l['text-size'] = 12;
    } else if (id === 'road_shield_us' || id.startsWith('highway-shield')) {
      l['icon-size'] = 0.95; l['text-size'] = 10.5;
    }
    layers.push(layer);

    // Terrain goes right above the land cover, under water and roads.
    if (id === 'landcover_sand' || (id === 'water' && !layers.some((x) => x.id === 'hillshade'))) {
      if (!layers.some((x) => x.id === 'hillshade')) {
        layers.splice(layers.length - 1, 0,
          { id: 'hillshade', type: 'hillshade', source: 'dem', paint: {
            'hillshade-exaggeration': 0.32, 'hillshade-shadow-color': '#7E8C78', 'hillshade-highlight-color': '#FBFAF4', 'hillshade-accent-color': '#9AA592',
            'hillshade-illumination-direction': 315 } },
          { id: 'contours', type: 'line', source: 'contours', 'source-layer': 'contours',
            paint: { 'line-color': '#8B987C', 'line-opacity': ['match', ['get', 'level'], 1, 0.5, 0.3], 'line-width': ['match', ['get', 'level'], 1, 0.8, 0.5] } });
      }
    }
  }

  // A few hand-placed labels (real names, real coordinates) instead of one label per polygon piece.
  style.sources.labels = { type: 'geojson', data: { type: 'FeatureCollection', features: labels.map((f) => ({
    type: 'Feature', properties: { name: f.name, kind: f.kind }, geometry: { type: 'Point', coordinates: f.at } })) } };
  layers.push({
    id: 'manual_labels', type: 'symbol', source: 'labels',
    layout: {
      'text-field': ['get', 'name'], 'text-max-width': 8, 'text-allow-overlap': true,
      'text-font': ['match', ['get', 'kind'], 'park', ['literal', ['Noto Sans Italic']], 'water', ['literal', ['Noto Sans Italic']], 'town', ['literal', ['Noto Sans Bold']], ['literal', ['Noto Sans Regular']]],
      'text-size': ['match', ['get', 'kind'], 'park', 14, 'town', 16, 12],
      'text-anchor': ['match', ['get', 'kind'], 'town', 'right', 'center'],
    },
    paint: {
      'text-color': ['match', ['get', 'kind'], 'park', '#4F6343', 'water', '#557A8D', 'town', LABEL, MUTED],
      'text-halo-color': 'rgba(236,233,223,0.85)', 'text-halo-width': 1.4,
    },
  });

  style.layers = layers;
  return style;
}
