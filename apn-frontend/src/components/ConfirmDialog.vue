<template>
  <v-dialog
    v-if="confirmDialog"
    v-model="confirmDialog.model"
    :max-width="confirmDialog.width"
    persistent
  >
    <v-card>
      <v-card-title>{{ confirmDialog.title }}</v-card-title>
      <v-card-text v-html="confirmDialog.text"/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="gray darken-1"
          text
          @click="confirmDialog.cancel"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          depressed
          @click="confirmDialog.ok"
        >
          Ок
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// TODO: check click.stop https://vuetifyjs.com/en/components/dialogs/#without-activator
export default {
  name: 'ConfirmDialog',
  computed: {
    confirmDialog() {
      return this.$store.app.confirmDialog;
    },
  },
};
</script>

<style scoped>

</style>
