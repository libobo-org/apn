<template>
  <v-dialog
      :value="value"
      @change="v => $emit('input', v)"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
  >
    <v-card tile>
      <v-toolbar
          flat
          class="toolbar"
      >
        <v-toolbar-title>Выберите ТН ВЭД коды</v-toolbar-title>
        <v-text-field
            outlined
            dense
            color="indigo"
            class="my-2 mx-2"
            hide-details
        />
        <v-btn
            icon
            @click="$emit('input', false)"
            class="toolbar__button-close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <TnvedTree class="overflow-y-auto" style="width: 100%; height: 100%;"/>
    </v-card>
  </v-dialog>
</template>

<script>
import TnvedTree from "@/components/TnvedTree";
export default {
  name: 'TnvedDialog',
  components: {TnvedTree},
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
