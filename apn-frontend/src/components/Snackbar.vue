<template>
  <v-snackbar
    v-if="snackbar"
    v-model="snackbar.model"
    :timeout="snackbar.timeout"
    :color="snackbar.color || 'info'"
    :bottom="true"
  >
    {{ snackbar.text }}
    <template v-slot:action="{}">
      <v-btn color="white" icon @click="snackbar.model = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Snackbar',
  computed: {
    snackbar() {
      return this.$store.app.snackbar;
    },
  },
};
</script>

<style scoped>

</style>
