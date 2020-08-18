import Vue from 'vue';
import MapboxMap from './MapboxMap.vue';
import ScrollyMap from './ScrollyMap.vue';
import MapboxCompare from './MapboxCompare.vue';

const VueMaps = {
  MapboxCompare,
  MapboxMap,
  ScrollyMap,
};

Object.keys(VueMaps).forEach((name) => {
  Vue.component(name, VueMaps[name]);
});

export default VueMaps;
