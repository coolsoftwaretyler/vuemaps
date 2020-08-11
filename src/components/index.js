import Vue from 'vue';
import MapboxMap from './MapboxMap.vue';
import ScrollyMap from './ScrollyMap.vue';

const VueMaps = {
  MapboxMap,
  ScrollyMap
};

Object.keys(VueMaps).forEach((name) => {
  Vue.component(name, VueMaps[name]);
});

export default VueMaps;
