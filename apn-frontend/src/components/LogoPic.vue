<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 100 100">
    <rect x="20.9" y="42" width="6.4" height="14.9" :fill="color" style=""></rect>
    <rect x="32.6" y="31.9" width="6.4" height="24.9" :fill="color" style=""></rect>
    <rect x="44" y="36.8" width="6.4" height="20.1" :fill="color" style=""></rect>
    <rect x="55.7" y="47.5" width="6.4" height="9.3" :fill="color" style=""></rect>
    <path :fill="color" style="" d="M71.4,69.9l0.5-0.5c6.2-7.2,9.6-16.3,9.6-25.8C81.5,21.8,63.8,4.1,42,4.1C20.2,4.1,2.5,21.8,2.5,43.5S20.2,83,42,83  c8.9,0,17.3-2.9,24.3-8.4l0.4-0.3l26,21l4-5L71.4,69.9z M42,76.6c-18.2,0-33.1-14.8-33.1-33.1c0-18.2,14.8-33.1,33.1-33.1  c18.2,0,33.1,14.8,33.1,33.1C75.1,61.8,60.2,76.6,42,76.6z"></path>
  </svg>
</template>

<script>
export default {
  name: 'LogoPic',
  props: {
    width: {
      type: Number,
      required: false,
      default: 128,
    },
    height: {
      type: Number,
      required: false,
      default: 128,
    },
    color: {
      type: String,
      required: false,
      default: '#f4b41a',
    },
  },
};
</script>

<style scoped>

</style>
