<template>
  <ScrollyMap :config="mapConfig" />
</template>

<script>
import ScrollyMap from '../components/ScrollyMap';

export default {
  components: {
    ScrollyMap,
  },
  data() {
    return {
      mapConfig: {
        title: 'ScrollyMap',
        subtitle: 'For scrolling',
        mapProperties: {
          style: 'mapbox://styles/dginteractive/ckara0drq1k1h1iqpds78j62m',
          zoom: 4,
          center: [54.0716196, 32.80577492],
          maxZoom: 19,
          minZoom: 3,
          showMarkers: false,
        },
        chapters: [
          {
            id: 'glacier-np',
            title: 'Imagery basemaps',
            image: '',
            description:
              'High-resolution satellite imagery helps you detect and visualize change clearly. Here we can see a new development taking shape.',
            legend: [
              { color: '#4164FB', text: 'Ecopia Building Footprints' },
              { color: '#FCAF17', text: 'Ecopia Roads' },
              { color: '#0E9797', text: 'Borders' },
            ],
            location: {
              center: [-115.360741, 36.176497],
              zoom: 14.5,
              pitch: 0.0,
              bearing: 0.0,
            },
            onChapterEnter: [
              {
                layer: '2011 Image',
                opacity: 1,
              },
            ],
            onChapterExit: [],
          },
          {
            id: 'harrison1998',
            title: 'Change Detection',
            image: '',
            description:
              'Advanced analytics offer persistent change monitoring (PCM), helping mapping specialists verify driver data and minimize ghost roads.',
            markup: '<ul><li>one</li></ul>',
            location: {
              center: [-115.360741, 36.176497],
              zoom: 14.5,
              pitch: 0.0,
              bearing: 0.0,
            },
            onChapterEnter: [
              {
                layer: 'PCM Layer',
                opacity: 0.65,
              },
              {
                layer: '2011 Image',
                opacity: 1,
              },
            ],
            onChapterExit: [
              {
                layer: 'PCM Layer',
                opacity: 0,
              },
              {
                layer: '2011 Image',
                opacity: 0,
              },
            ],
          },
          {
            id: 'harrison2015',
            title: 'Map maintenance',
            image: '',
            description:
              'Access to PCM data enables you to identify areas that may need a new image refresh for detailed analysis and map updates.',
            location: {
              center: [-115.360741, 36.176497],
              zoom: 14.5,
              pitch: 0.0,
              bearing: 0.0,
            },
            onChapterEnter: [
              {
                layer: '2020 Image',
                opacity: 1,
              },
            ],
            onChapterExit: [
              {
                layer: '2020 Image',
                opacity: 0,
              },
            ],
          },
          {
            id: 'openstreetmaps',
            title: 'Streamlined updates',
            image: '',
            description:
              'Satellite imagery derived data makes keeping maps up to date with accurately labeled roads and buildings easy and cost-effective.',
            location: {
              center: [-115.360741, 36.176497],
              zoom: 14.5,
              pitch: 0.0,
              bearing: 0.0,
            },
            onChapterEnter: [
              {
                layer: '2020 Image',
                opacity: 0,
              },
            ],
            onChapterExit: [
              {
                layer: '2020 Image',
                opacity: 0,
              },
            ],
          },
          {
            id: 'osm_zoom',
            title: 'Ghost road prevention',
            image: '',
            description:
              'This neighborhood is still in early stages of development. By knowing construction is happening, mapping teams can monitor progress for updates that prevent ghost roads.',
            location: {
              center: [-115.360741, 36.176497],
              zoom: 17,
              pitch: 0.0,
              bearing: 0.0,
            },
            onChapterEnter: [],
            onChapterExit: [],
          },
        ],
      },
    };
  },
};
</script>
