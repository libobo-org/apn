export function generateTnvedAnalytics(timeSeries) {
  const labels = timeSeries.map(el => `${el.month}.${el.year}`);
  const timeSeriesData = {
    ex_notes_count: timeSeries.map(el => parseFloat(el.ex_notes_count)),
    im_notes_count: timeSeries.map(el => parseFloat(el.im_notes_count)),
    ex_cost_sum: timeSeries.map(el => parseFloat(el.ex_cost_sum)),
    im_cost_sum: timeSeries.map(el => parseFloat(el.im_cost_sum)),
    ex_kol_sum: timeSeries.map(el => parseFloat(el.ex_kol_sum)),
    im_kol_sum: timeSeries.map(el => parseFloat(el.im_kol_sum)),
    ex_cost_by_one_kol_avg: timeSeries.map(el => parseFloat(el.ex_cost_by_one_kol_avg)),
    im_cost_by_one_kol_avg: timeSeries.map(el => parseFloat(el.im_cost_by_one_kol_avg)),
    ex_cost_by_one_note_avg: timeSeries.map(el => parseFloat(el.ex_cost_by_one_note_avg)),
    im_cost_by_one_note_avg: timeSeries.map(el => parseFloat(el.im_cost_by_one_note_avg)),
  };

  const timeSeriesDataMeta = {
    ex_notes_count: {
      borderColor: ['rgb(51, 204, 204)']
    },
    im_notes_count: {
      borderColor: ['rgb(255, 102, 255)'],
    },
    ex_cost_sum: {
      borderColor: ['rgb(51, 204, 204)']
    },
    im_cost_sum: {
      borderColor: ['rgb(255, 102, 255)'],
    },
    ex_kol_sum: {
      borderColor: ['rgb(51,105,204)']
    },
    im_kol_sum: {
      borderColor: ['rgb(9,25,74)'],
    },
    ex_cost_by_one_kol_avg: {
      borderColor: ['rgb(97,169,95)']
    },
    im_cost_by_one_kol_avg: {
      borderColor: ['rgb(35,88,9)'],
    },
    ex_cost_by_one_note_avg: {
      borderColor: ['rgb(244,19,44)']
    },
    im_cost_by_one_note_avg: {
      borderColor: ['rgb(90,6,6)'],
    },
  };

  const chartDatasetsKeys1 = ['ex_notes_count', 'im_notes_count', 'ex_kol_sum', 'im_kol_sum'];
  const chartDatasetsKeys2 = ['ex_cost_sum', 'im_cost_sum', 'ex_cost_by_one_kol_avg', 'im_cost_by_one_kol_avg', 'ex_cost_by_one_note_avg', 'im_cost_by_one_note_avg'];

  const datasets1 = chartDatasetsKeys1.map(k => ({
    label: k,
    data: timeSeriesData[k],
    fill: false,
    borderColor: timeSeriesDataMeta[k].borderColor,
    borderWidth: 1,
    xAxisID: 'xAxis1', // define top or bottom axis, modifies on scale
  }));

  const datasets2 = chartDatasetsKeys2.map(k => ({
    label: k,
    data: timeSeriesData[k],
    fill: false,
    borderColor: timeSeriesDataMeta[k].borderColor,
    borderWidth: 1,
    xAxisID: 'xAxis1', // define top or bottom axis, modifies on scale
  }));

  function createConfiguration(datasets) {
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

  const configuration1 = createConfiguration(datasets1);
  const configuration2 = createConfiguration(datasets2);

  // const chartData1 = await chart.generateChart(configuration1);
  // const chartData2 = await chart.generateChart(configuration2);

  return {
    configuration1,
    configuration2,
  };
}

export default {
  generateTnvedAnalytics,
};
