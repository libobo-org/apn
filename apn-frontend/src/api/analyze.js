export function createConfiguration(datasets, labels) {
  return {
    type: 'line', // for line chart
    data: {
      labels,
      datasets,
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
        }
      }
    }
  };
}

export function generateTnvedAnalytics(timeSeriesData, labels, chartDatasetsKeys) {
  // const labels = timeSeries.map(el => `${el.month}.${el.year}`);
  // const timeSeriesData = {
  //   ex_notes_count: timeSeries.map(el => parseFloat(el.ex_notes_count)),
  //   im_notes_count: timeSeries.map(el => parseFloat(el.im_notes_count)),
  //   ex_cost_sum: timeSeries.map(el => parseFloat(el.ex_cost_sum)),
  //   im_cost_sum: timeSeries.map(el => parseFloat(el.im_cost_sum)),
  //   ex_kol_sum: timeSeries.map(el => parseFloat(el.ex_kol_sum)),
  //   im_kol_sum: timeSeries.map(el => parseFloat(el.im_kol_sum)),
  //   ex_cost_by_one_kol_avg: timeSeries.map(el => parseFloat(el.ex_cost_by_one_kol_avg)),
  //   im_cost_by_one_kol_avg: timeSeries.map(el => parseFloat(el.im_cost_by_one_kol_avg)),
  //   ex_cost_by_one_note_avg: timeSeries.map(el => parseFloat(el.ex_cost_by_one_note_avg)),
  //   im_cost_by_one_note_avg: timeSeries.map(el => parseFloat(el.im_cost_by_one_note_avg)),
  // };
  // const chartDatasetsKeys1 = [
  //   'ex_cost_sum',
  //   'im_cost_sum',
  //   'ex_cost_sum_without_last_year',
  //   'im_cost_sum_without_last_year',
  //   'ex_cost_sum_predicted_test',
  //   'im_cost_sum_predicted_test',
  //   'ex_cost_sum_predicted',
  //   'im_cost_sum_predicted',
  // ];


  const timeSeriesDataMeta = {
    ex_cost_sum: {
      borderColor: ['rgb(51, 204, 204)']
    },
    im_cost_sum: {
      borderColor: ['rgb(51, 204, 204)'],
    },
    ex_cost_sum_without_last_year: {
      borderColor: ['rgb(35,88,9)'],
      borderDash: [10, 10],
    },
    im_cost_sum_without_last_year: {
      borderColor: ['rgb(35,88,9)'],
      borderDash: [10, 10],
    },
    ex_cost_sum_predicted_test: {
      borderColor: ['rgb(255, 102, 255)'],
      borderDash: [25, 25],
    },
    im_cost_sum_predicted_test: {
      borderColor: ['rgb(255, 102, 255)'],
      borderDash: [25, 25],
    },
    ex_cost_sum_predicted: {
      borderColor: ['rgb(244,19,44)'],
      borderDash: [2, 2],
    },
    im_cost_sum_predicted: {
      borderColor: ['rgb(244,19,44)'],
      borderDash: [2, 2],
    },
    // im_cost_by_one_kol_avg: {
    //   borderColor: ['rgb(35,88,9)'],
    // },
    // ex_cost_by_one_note_avg: {
    //   borderColor: ['rgb(244,19,44)']
    // },
    // im_cost_by_one_note_avg: {
    //   borderColor: ['rgb(90,6,6)'],
    // },
  };

  const datasets = chartDatasetsKeys.map(k => ({
    label: k,
    data: timeSeriesData[k],
    fill: false,
    borderColor: timeSeriesDataMeta[k].borderColor,
    borderDash: timeSeriesDataMeta[k].borderDash,
    borderWidth: 1,
    xAxisID: 'xAxis1', // define top or bottom axis, modifies on scale
  }));

  return createConfiguration(datasets, labels);
}

export default {
  generateTnvedAnalytics,
};
