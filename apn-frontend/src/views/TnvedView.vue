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
      <v-btn depressed @click="showTree">show tree</v-btn>
      <TnvedDialog v-model="isShowDialog"/>
    </v-sheet>
  </div>
</template>

<script>
import TnvedDialog from "@/components/TnvedDialog";
export default {
  name: 'TnvedView',
  components: {TnvedDialog},
  data: () => ({
    isShowDialog: false,
  }),
  methods: {
    showTree() {
      this.isShowDialog = true;
    },
  },
};
</script>
