<template>
  <div class="chapter">
    <h3 v-if="record.title">{{ record.title }}</h3>
    <img v-if="record.image" :src="record.image" />
    <p v-if="record.description">{{ record.description }}</p>
    <button
      :class="`hamburger hamburger--squeeze ${detailsOpen ? 'is-active' : ''}`"
      type="button"
      @click="detailsOpen = !detailsOpen"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      detailsOpen: false,
    };
  },
};
</script>
