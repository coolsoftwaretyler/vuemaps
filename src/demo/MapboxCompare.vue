<template>
  <MapboxCompare :config="config" />
</template>

<script>
import MapboxCompare from '../components/MapboxCompare';
export default {
  components: {
    MapboxCompare,
  },
  data() {
    return {
      config: {
        leftLabel: 'Maxar Satellite Imagery',
        leftMapConfig: {
          mapProperties: {
            center: [-77.063693, 26.53891],
            zoom: 16,
            maxBounds: [
              [-77.09, 26.5349],
              [-77.0504, 26.5488],
            ],
          },
          layers: [
            {
              name: 'osm-buildings-with-attribution',
              visibility: 'none',
            },
          ],
        },
        rightLabel: 'Damage to structure',
        rightMapConfig: {
          mapProperties: {
            center: [-77.063693, 26.53891],
            zoom: 16,
            maxBounds: [
              [-77.09, 26.5349],
              [-77.0504, 26.5488],
            ],
          },
          layers: [],
        },
        style: 'mapbox://styles/dginteractive/ckcuzh6q006f61is8x3aj8258',
      },
    };
  },
};
</script>
