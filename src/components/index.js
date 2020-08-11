import Vue from 'vue';
import MapboxMap from './MapboxMap.vue';

const VueMaps = {
  MapboxMap,
};

Object.keys(VueMaps).forEach((name) => {
  Vue.component(name, VueMaps[name]);
});

export default VueMaps;
