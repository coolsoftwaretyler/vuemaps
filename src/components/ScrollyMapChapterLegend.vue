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
    <aside :class="active || legend.legendActive ? 'active' : ''">
      <p v-for="item in legend.items" :key="item.text">
        <span :style="`background-color: ${item.color};`"></span>
        {{ item.text }}
      </p>
    </aside>
  </div>
</template>

<script>
export default {
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
    position: relative;
    z-index: 2;
  }

  aside {
    background-color: rgba(107, 105, 101, 0.9);
    border-left: 2px solid #fcaf17;
    bottom: 0;
    box-sizing: border-box;
    left: -2px;
    opacity: 0;
    padding-bottom: 10px;
    padding-left: 20px;
    position: absolute;
    transform: translateY(0%);
    transition: all 0.15s ease;
    width: calc(100% + 2px);
    z-index: 1;
    &.active {
      opacity: 1;
      transform: translateY(100%);
    }
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
