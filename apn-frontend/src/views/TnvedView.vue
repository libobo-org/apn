<template>
  <div class="main-layout">
    <v-sheet>
      <h1>This is an TNVED page</h1>
      <v-text-field
          outlined
          color="indigo"
          class="my-2"
          hide-details
      />
      <TnvedTree/>
    </v-sheet>
  </div>
</template>

<script>
import TnvedTree from "@/components/TnvedTree";
export default {
  name: 'TnvedView',
  components: {TnvedTree},
};
</script>
