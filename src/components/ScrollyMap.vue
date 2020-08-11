<template>
  <div class="mapContainer">
    <div class="map" ref="map"></div>
    <div class="header">
      <h2 v-if="config.title">{{ config.title }}</h2>
      <h3 v-if="config.subtitle">{{ config.subtitle }}</h3>
    </div>
    <div class="features">
      <!-- container -->
      <div
        v-for="(record, index) in config.chapters"
        :id="record.id"
        :key="record.id"
        :class="index == 0 ? 'active step' : 'step'"
      >
        <!-- chapter -->
        <div class="chapter">
          <h3 v-if="record.title">{{ record.title }}</h3>
          <img v-if="record.image" :src="record.image" />
          <p v-if="record.description">{{ record.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'intersection-observer';
import scrollama from 'scrollama';
export default {
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
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
      container: this.$refs.map,
      style: this.config.mapProperties.style,
      center: this.config.chapters[0].location.center,
      zoom: this.config.chapters[0].location.zoom,
      bearing: this.config.chapters[0].location.bearing,
      pitch: this.config.chapters[0].location.pitch,
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
        .setup({ step: '.step', offset: 0.7, progress: true })
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
  },
};
</script>

<style lang="scss" scoped>
.map {
  top: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 0;
}

.header {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  margin: 1vh auto;
  width: 50vw;
  padding: 2vh;
  text-align: center;
  z-index: 2;
  position: relative;
}

.features {
  padding-top: 5vh;
  padding-bottom: 5vh;
  z-index: 100;
}

.chapter {
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  width: 33vw;
  margin-left: 5vw;
  padding: 5px 25px;
  line-height: 20px;
  font-size: 20px;
}

.step {
  padding-bottom: 50vh;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  &.active {
    opacity: 0.9;
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
