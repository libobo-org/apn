<template>
  <h1 class="text-center">
    <LogoPic :width="30" :height="30" color="#ba1827" class="mb-n2"/>
    <span v-if="title">{{title}}</span>
  </h1>
</template>

<script>
import LogoPic from "@/components/LogoPic";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Logo',
  components: {LogoPic},
  props: {
    title: {
      type: String,
      required: false,
      default: 'APN',
    },
  },
};
</script>

<style scoped>

</style>
