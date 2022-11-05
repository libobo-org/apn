<template>
  <div class="main-layout">
    <v-sheet>
      <div class="d-flex">
        <v-text-field v-model="tnvedInput" outlined hide-details dense></v-text-field>
        <v-btn depressed color="primary" @click="process" class="ml-2" :loading="isLoading">Process</v-btn>
      </div>
      <ChartLine v-if="configuration1" :chartData="configuration1.data" chartId="c1" datasetIdKey="c1" style="width: 500px" />
      <ChartLine v-if="configuration2" :chartData="configuration2.data" chartId="c2" datasetIdKey="c2" style="width: 500px" class="mt-4"/>
    </v-sheet>
  </div>
</template>
<script>
import ChartLine from "@/components/ChartLine";

export default {
  components: {ChartLine},
  data: () => ({
    configuration1: null,
    configuration2: null,
    tnvedInput: '1002100000',
    isLoading: false,
  }),
  methods: {
    async process() {
      try {
        this.isLoading = true;
        const response = await fetch(`http://localhost:3000/analyze/tnved-analyze?tnved=${this.tnvedInput}`);
        const json = await response.json();
        const c = this.$api.main.analyze.generateTnvedAnalytics(json.data);
        this.configuration1 = c.configuration1;
        this.configuration2 = c.configuration2;
      } catch (e) {
        this.$api.app.snackError('Не удалось произвести расчет');
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {

  },
};
</script>
