import Vue from "vue";

const VueMaps = {

}

Object.keys(VueMaps).forEach(name => {
    Vue.component(name, VueMaps[name]);
});

export default VueMaps;