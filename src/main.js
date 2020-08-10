import Vue from 'vue';
import App from './App.vue';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
Vue.use(mapboxgl);
Vue.prototype.$mapboxgl = mapboxgl;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');