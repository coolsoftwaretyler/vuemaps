<template>
  <div class="mapContainer">
    <div class="map" ref="map"></div>
    <div class="features">
      <div
        v-for="(chapter, index) in config.chapters"
        :id="chapter.id"
        :key="chapter.id"
        :class="index == 0 ? 'active step' : 'step'"
      >
        <ScrollyMapChapter
          :chapter="chapter"
          :legendActive="legendActive"
          :sharedLegendState="sharedLegendState"
          v-on:legendtoggle="legendActive = !legendActive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import 'intersection-observer';
import scrollama from 'scrollama';
import ScrollyMapChapter from './ScrollyMapChapter';

export default {
  components: {
    ScrollyMapChapter,
  },
  props: {
    config: {
      type: Object,
      default: null,
    },
    sharedLegendState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      layerTypes: {
        fill: ['fill-opacity'],
        line: ['line-opacity'],
        circle: ['circle-opacity', 'circle-stroke-opacity'],
        symbol: ['icon-opacity', 'text-opacity'],
        raster: ['raster-opacity'],
        'fill-extrusion': ['fill-extrusion-opacity'],
      },
      legendActive: false,
      map: null,
      mapboxgl: null,
    };
  },
  mounted() {
    const transformRequest = (url) => {
      const hasQuery = url.includes('?');
      const suffix = hasQuery
        ? '&pluginName=journalismScrollytelling'
        : '?pluginName=journalismScrollytelling';
      return {
        url: url + suffix,
      };
    };

    this.mapboxgl = this.$mapboxgl || window.mapboxgl;
    this.map = new this.mapboxgl.Map({
      ...this.config.chapters[0].location,
      container: this.$refs.map,
      style: this.config.mapProperties.style,
      scrollZoom: false,
      transformRequest,
    });
    const marker = new this.mapboxgl.Marker();
    if (this.config.showMarkers) {
      marker.setLngLat(this.config.chapters[0].location.center).addTo(this.map);
    }
    const scroller = scrollama();
    this.map.on('load', () => {
      scroller
        .setup({ step: '.step', offset: 0.66, progress: true })
        .onStepEnter((response) => {
          const chapter = this.config.chapters.find(
            (chap) => chap.id === response.element.id
          );
          response.element.classList.add('active');
          this.map.flyTo(chapter.location);
          if (this.config.showMarkers) {
            marker.setLngLat(chapter.location.center);
          }
          if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(this.setLayerOpacity);
          }
        })
        .onStepExit((response) => {
          const chapter = this.config.chapters.find(
            (chap) => chap.id === response.element.id
          );
          response.element.classList.remove('active');
          if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(this.setLayerOpacity);
          }
        });
      // Emit a JS custom event for non-vue consumers
      const event = new CustomEvent('map-ready', { detail: this.map });
      document.dispatchEvent(event);
      // Emit a Vue.js custom event
      this.$emit('map-ready', this.map);
    });
    window.addEventListener('resize', scroller.resize);
  },
  methods: {
    getLayerPaintType(layer) {
      const layerType = this.map.getLayer(layer).type;
      return this.layerTypes[layerType];
    },
    setLayerOpacity(layer) {
      const paintProps = this.getLayerPaintType(layer.layer);
      paintProps.forEach((prop) => {
        this.map.setPaintProperty(layer.layer, prop, layer.opacity);
      });
    },
    handleLegendToggle() {
      console.log('Legend toggled');
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 0;
}

.features {
  padding: 0;
  padding-top: 66vh;
}

.chapter {
  background-color: rgba(107, 105, 101, 0.9);
  box-sizing: border-box;
  border-left: 2px solid #fcaf17;
  color: white;
  margin-left: 80px;
  max-width: 700px;
  padding: 10px 20px;
  position: relative;
  width: 100%;
  @media (max-width: 860px) {
    margin: 0 auto;
  }
}

.step {
  opacity: 0;
  padding-bottom: 34vh;
  transition: opacity 0.2s ease-in;
  &.active {
    opacity: 0.9;
    transition: opacity 1s ease-in-out;
  }
  h3 {
    margin-top: 0.5em;
  }
  img {
    width: 100%;
  }
}

@media (max-width: 750px) {
  .features {
    width: 90vw;
    margin: 0 auto;
  }
}
</style>
