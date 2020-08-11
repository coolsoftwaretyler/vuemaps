import Vue from 'vue';
import mapboxgl from 'mapbox-gl';
import VueRouter from 'vue-router';

// Pages for VueRouter
import Home from './demo/Home.vue';
import SlippyMap from './demo/SlippyMap.vue';
import ScrollyMap from './demo/ScrollyMap.vue';

// Vue setup
Vue.use(VueRouter);
mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
Vue.use(mapboxgl);
Vue.prototype.$mapboxgl = mapboxgl;
Vue.config.productionTip = false;

// Routes
const routes = [
  { path: '/', component: Home },
  { path: '/slippy-map', component: SlippyMap },
  { path: '/scrolly-map', component: ScrollyMap },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
}).$mount('#app');
