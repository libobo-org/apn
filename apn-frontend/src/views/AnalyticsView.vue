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
        if (!this.tnvedInput) {
          // TODO: error valid
          return;
        }
        this.isLoading = true;
        const response = await fetch(`http://localhost:3000/analyze/tnved-analyze?tnved=${this.tnvedInput}`, {
          mode: 'cors',
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const json = await response.json();
        const {
          labels,
          timeSeriesData,
        } = json.data;
        // const chartDatasetsKeys1 = ['ex_notes_count', 'im_notes_count', 'ex_kol_sum', 'im_kol_sum'];
        const chartDatasetsKeys1 = [
          'im_cost_sum',
          // 'im_cost_sum_without_last_year',
          'im_cost_sum_predicted_test',
          'im_cost_sum_predicted',
        ];
        const chartDatasetsKeys2 = [
          'ex_cost_sum',
          // 'ex_cost_sum_without_last_year',
          'ex_cost_sum_predicted_test',
          'ex_cost_sum_predicted',
        ];
        // const chartDatasetsKeys2 = ['ex_cost_sum', 'im_cost_sum', 'ex_cost_by_one_kol_avg', 'im_cost_by_one_kol_avg', 'ex_cost_by_one_note_avg', 'im_cost_by_one_note_avg'];
        this.configuration1 = this.$api.main.analyze.generateTnvedAnalytics(timeSeriesData, labels, chartDatasetsKeys1);
        this.configuration2 = this.$api.main.analyze.generateTnvedAnalytics(timeSeriesData, labels, chartDatasetsKeys2);
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
