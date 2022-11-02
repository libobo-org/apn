<template>
  <v-row class="main-layout">
    <v-col>
      <v-sheet height="300">
        <h1>sheet 1</h1>
      </v-sheet>
      <v-sheet height="700">
        <h1>sheet 2</h1>
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet height="500">
        <h1>sheet 3</h1>
      </v-sheet>
      <v-sheet height="300">
        <h1>sheet 4</h1>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'HomeView',

    components: {
      // HelloWorld,
    },
  }
</script>

<style scoped>
</style>
