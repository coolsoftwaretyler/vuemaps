<template>
  <svg
    :class="direction"
    xmlns="http://www.w3.org/2000/svg"
    width="18.122"
    height="34.393"
    viewBox="0 0 35 35"
  >
    <path
      data-name="Path 486"
      d="M.729.707l16 16-16 17"
      fill="none"
      stroke-width="4"
    />
  </svg>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'down',
    },
  },
};
</script>

<style lang="scss">
.down {
  transform: rotate(90deg);
}
.left {
  transform: rotate(180deg);
}
.right {
  transform: none;
}
.up {
  transform: rotate(270deg);
}
</style>
