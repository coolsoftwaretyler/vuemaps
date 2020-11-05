<template>
  <div class="chapterLegend">
    <button aria-label="Toggle legend" @click="handleLegendToggle">
      <Arrow :direction="active || legend.legendActive ? 'down' : 'up'" />
    </button>
    <aside :class="active || legend.legendActive ? 'active' : ''">
      <p v-for="item in legend.items" :key="item.text">
        <span
          :class="item.hollow ? 'hollow' : ''"
          :style="`background-color: ${item.color}; border: 2px solid ${item.color}`"
        ></span>
        {{ item.text }}
      </p>
      <img v-if="legend.imageUrl" :src="legend.imageUrl" :alt="legend.imageAltText"/>
    </aside>
  </div>
</template>

<script>
import Arrow from './Arrow.vue';

export default {
  props: {
    legend: {
      type: Object,
      default: null,
    },
  },
  components: {
    Arrow,
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
  button {
    align-self: flex-end;
    border: none;
    height: 24px;
    padding: 0;
    position: relative;
    width: 24px;
    z-index: 2;
    svg {
      height: 100%;
      stroke: #fcaf17;
      transform-origin: left;
      transition: stroke 0.3s ease-in-out;
      width: auto;
    }
    &:hover,
    &:focus,
    &:active {
      background: transparent;
      svg {
        stroke: white;
      }
    }
  }

  aside {
    background-color: rgba(107, 105, 101, 0.9);
    border-left: 2px solid #fcaf17;
    bottom: 0;
    box-sizing: border-box;
    left: -2px;
    opacity: 0;
    padding: 10px 20px;
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
      box-sizing: border-box;
      display: inline-block;
      height: 16px;
      margin-bottom: -3px;
      margin-right: 0.5em;
      width: 16px;
      &.hollow {
        background-color: transparent !important;
      }
    }
  }
  img {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
