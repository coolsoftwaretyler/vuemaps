<template>
  <div ref="container">
    <div ref="left" class="map"></div>
    <div class="label--left">{{config.leftLabel}}</div>
    <div ref="right"></div>
    <div class="map">{{config.rightLabel}}</div>
  </div>
</template>

<script>
import MapboxCompare from 'mapbox-gl-compare';

export default {
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      leftMap: null,
      rightMap: null,
      map: null,
    };
  },
  mounted() {
    // You can load mapbox as a Vue plugin or through a global script, depending on where you plan to run this component.
    this.mapboxgl = this.$mapboxgl || window.mapboxgl;
    this.leftMap = new this.mapboxgl.Map({
      ...this.config.leftMapConfig.mapProperties,
      container: this.$refs.left,
      style: this.style,
    });
    this.rightMap = new this.mapboxgl.Map({
      ...this.config.rightMapConfig.mapProperties,
      container: this.$refs.right,
      style: this.config.style,
    });
    this.leftMap.on('load', () => {
      this.config.leftMapConfig.layers.map((layer) => {
        this.leftMap.setLayoutProperty(
          layer.name,
          'visibility',
          layer.visibility
        );
      });
    });
    this.rightMap.on('load', () => {
      this.config.rightMapConfig.layers.map((layer) => {
        this.rightMap.setLayoutProperty(
          layer.name,
          'visibility',
          layer.visibility
        );
      });
    });
    this.map = new MapboxCompare(this.leftMap, this.rightMap, this.$refs.container);
    window.GLOBAL_MAP_VAR = this.map
  },
};
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.mapboxgl-compare .compare-swiper-vertical {
  background-color: #fdb912;
}
.label--left {
  font-family: Blender, Helvetica, sans-serif;
  font-size: 1em;
  padding: 0.25em 0.75em;
  position: relative;
  display: inline-block;
  top: 0;
  background-color: #000;
  /* IE 8 */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
  white-space: nowrap;
  line-height: 18px;
  vertical-align: middle;
}

.label--right {
  float: right;
  font-family: Blender, Helvetica, sans-serif;
  font-size: 1em;
  padding: 0.25em 0.75em;
  position: relative;
  display: inline-block;
  top: 0;
  background-color: #000;
  /* IE 8 */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
  white-space: nowrap;
  line-height: 18px;
  vertical-align: middle;
}
</style>