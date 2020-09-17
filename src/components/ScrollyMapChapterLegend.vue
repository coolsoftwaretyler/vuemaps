<template>
  <div class="chapterLegend">
    <button
      :class="`hamburger hamburger--squeeze ${
        active || legend.legendActive ? 'is-active' : ''
      }`"
      type="button"
      @click="handleLegendToggle"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <slide-up-down :active="active || legend.legendActive" :duration="150">
      <p v-for="item in legend.items" :key="item.text">
        <span :style="`background-color: ${item.color};`"></span>
        {{ item.text }}
      </p>
    </slide-up-down>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
export default {
  components: {
    SlideUpDown,
  },
  props: {
    legend: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleLegendToggle() {
      if (this.legend.sharedLegendState) {
        this.$emit('legendtoggle');
      } else {
        this.active = !this.active;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chapterLegend {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .hamburger {
    align-self: flex-end;
  }
  p {
    font-size: 12px;
    margin-bottom: 0;
    span {
      display: inline-block;
      height: 16px;
      margin-bottom: -3px;
      margin-right: 0.5em;
      width: 16px;
    }
  }
}
</style>
