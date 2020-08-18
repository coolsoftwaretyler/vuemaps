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
          mapProperties: {},
          layers: [],
        },
        rightLabel: 'Damage to structure',
        rightMapConfig: {
          mapProperties: {},
          layers: [],
        },
        style: 'mapbox://styles/dginteractive/ckcuzh6q006f61is8x3aj8258',
      },
    };
  },
};
</script>
