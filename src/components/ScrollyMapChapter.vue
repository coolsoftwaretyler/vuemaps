<template>
  <div class="chapter">
    <h3 v-if="chapter.title">{{ chapter.title }}</h3>
    <img v-if="chapter.image" :src="chapter.image" />
    <p v-if="chapter.description">{{ chapter.description }}</p>
    <div v-if="chapter.markup" v-html="chapter.markup"></div>
    <ScrollyMapChapterLegend
      v-if="chapter.legend && chapter.legend.length > 0"
      :legend="{
        imageUrl: chapter.legendImageUrl,
        items: chapter.legend,
        legendActive,
        sharedLegendState,
      }"
      v-on:legendtoggle="$emit('legendtoggle')"
    />
  </div>
</template>

<script>
import ScrollyMapChapterLegend from './ScrollyMapChapterLegend';

export default {
  components: {
    ScrollyMapChapterLegend,
  },
  props: {
    chapter: {
      type: Object,
      default: null,
    },
    legendActive: {
      type: Boolean,
      default: true,
    },
    sharedLegendState: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
