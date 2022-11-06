import {makeClient} from './db.js';
import {loadSql} from './fs.js';
import {promises as fs} from 'fs';
import chart from './chart.js';
import {predictARIMA} from "./arima.js";
import {calcTrend} from "./trend.js";

export async function fetchMeta() {
  try {
    const client = await makeClient();
    let res = await client.query('SELECT $1::text as title', ['Meta data']);
    const title = res.rows[0].title;
    res = await client.query('select count(*) from notes');
    const notesCount = res.rows[0].count;
    const sql = await loadSql('notes-count.sql');
    res = await client.query(sql);
    const notesCount2 = res.rows[0].count;
    await client.end();
    return {
      title,
      notesCount,
      notesCount2,
    };
  } catch (e) {
    console.error('Errored fetchMeta');
    console.error(e);
    return null;
  }
}

export function exponentialSmoothing(series, alpha = 0.3) {
  if (!series?.length) {
    throw new Error('Incorrect series');
  }
  const res = [series[0]];
  for (let i = 1; i < series.length; i += 1) {
    res.push(alpha * series[i] + (1 - alpha) * res[i - 1]);
  }
  return res;
}

export function doubleExponentialSmoothing(series, alpha = 0.5, beta = 0.2) {
  if (!series?.length) {
    throw new Error('Incorrect series');
  }
  const res = [series[0]];
  let level;
  let trend;
  let value;
  let lastLevel;
  for (let i = 1; i < series.length + 1; i += 1) {
    if (i === 1) {
      level = series[0];
      trend = series[1] - series[0];
    }
    if (i > series.length) {
      value = res.at(-1);
    } else {
      value = series[i]
    }
    lastLevel = level;
    level = alpha * value + (1 - alpha) * (level + trend);
    trend = beta * (level - lastLevel) + (1 - beta) * trend;
    res.push(level + trend);
  }
  return res;
}

export function linearRegression(y, x) {
  let lr = {};
  let n = y.length;
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let sum_yy = 0;

  for (let i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  }

  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
  lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;
}
// const known_y = [1, 2, 3, 4];
// const known_x = [5.2, 5.7, 5.0, 4.2];
// const lr = linearRregression(known_y, known_x);

export async function analyze(tnved) {
  if (!tnved) {
    throw new Error('Undefined tnved');
  }
  // const tnved = '0102211000';
  // const tnved = '0102';
  let timeSeries = null;
  const client = await makeClient();
  try {
    // TODO: check exist tnved
    const sql = await loadSql('tnved-time-series.sql');
    const res = await client.query(sql, [tnved.length, tnved]);
    timeSeries = res.rows;
    await client.end();
  } catch (e) {
    console.error('Errored tnved-time-series.sql');
    console.error(e);
    return null;
  }

  const currentYear = new Date().getFullYear();
  const dataForPredictLastYear = timeSeries.filter(el => el.year < currentYear - 1);

  // console.log(timeSeries.map(el => parseFloat(el.im_cost_sum)))
  // console.log(doubleExponentialSmoothing(timeSeries.map(el => parseFloat(el.im_cost_sum))))
  const timeSeriesData = {
    // ex_notes_count: timeSeries.map(el => parseFloat(el.ex_notes_count)),
    // im_notes_count: timeSeries.map(el => parseFloat(el.im_notes_count)),
    ex_cost_sum: doubleExponentialSmoothing(timeSeries.map(el => parseFloat(el.ex_cost_sum))),
    im_cost_sum: doubleExponentialSmoothing(timeSeries.map(el => parseFloat(el.im_cost_sum))),
    // ex_kol_sum: timeSeries.map(el => parseFloat(el.ex_kol_sum)),
    // im_kol_sum: timeSeries.map(el => parseFloat(el.im_kol_sum)),
    // ex_cost_by_one_kol_avg: timeSeries.map(el => parseFloat(el.ex_cost_by_one_kol_avg)),
    // im_cost_by_one_kol_avg: timeSeries.map(el => parseFloat(el.im_cost_by_one_kol_avg)),
    // ex_cost_by_one_note_avg: timeSeries.map(el => parseFloat(el.ex_cost_by_one_note_avg)),
    // im_cost_by_one_note_avg: timeSeries.map(el => parseFloat(el.im_cost_by_one_note_avg)),

    ex_cost_sum_without_last_year: doubleExponentialSmoothing(dataForPredictLastYear.map(el => parseFloat(el.ex_cost_sum))),
    im_cost_sum_without_last_year: doubleExponentialSmoothing(dataForPredictLastYear.map(el => parseFloat(el.im_cost_sum))),
  };


  // const {lastMonth: month, lastYear: year} = timeSeries.at(-1);
  const predictYearsCount = 5;
  // Array(5).fill(0).map(el => Array(12).fill(0)).flat()
  // predictYearsCount.map(el => )
  const startYear = 2019;

  // Array(5).fill(0).map(el => Array(12).fill(0)).flat()
  // timeSeries.length

  // const beforeLastYear = dataForPredictLastYear.map(el => null);
  // const beforeCurrent = timeSeries.map(el => null);

  // timeSeriesData.ex_cost_sum_predicted_test = [...timeSeriesData.ex_cost_sum_without_last_year, ...await predictARIMA(timeSeriesData.ex_cost_sum_without_last_year, 24)];
  // timeSeriesData.im_cost_sum_predicted_test = [...timeSeriesData.im_cost_sum_without_last_year, ...await predictARIMA(timeSeriesData.im_cost_sum_without_last_year, 24)];

  const monthsCount = timeSeriesData.ex_cost_sum.length + predictYearsCount * 12;

  const labels = Array(monthsCount).fill(0).map((el, i) => `${String(((i % 12) + 1)).padStart(2, '0')}.${startYear +  Math.floor(i / 12)}`);

  let trend = calcTrend(timeSeries.map(el => parseFloat(el.ex_cost_sum)).map((el, i) => ({x: i, y: el})));
  timeSeriesData.ex_cost_sum_predicted_test = Array(monthsCount).fill(0).map((_, i) => trend.calcY(i));
  // console.log(trend)
  trend = calcTrend(timeSeries.map(el => parseFloat(el.im_cost_sum)).map((el, i) => ({x: i, y: el})));
  // console.log(trend)
  timeSeriesData.im_cost_sum_predicted_test = Array(monthsCount).fill(0).map((_, i) => trend.calcY(i));

  // timeSeriesData.ex_cost_sum_predicted_test = timeSeries.map(el => parseFloat(el.ex_cost_sum));
  // timeSeriesData.im_cost_sum_predicted_test = timeSeries.map(el => parseFloat(el.im_cost_sum));

  // timeSeriesData.ex_cost_sum_predicted = [...timeSeriesData.ex_cost_sum, ...await predictARIMA(timeSeriesData.ex_cost_sum, predictYearsCount * 12)];
  // timeSeriesData.im_cost_sum_predicted = [...timeSeriesData.im_cost_sum, ...await predictARIMA(timeSeriesData.im_cost_sum, predictYearsCount * 12)];
  timeSeriesData.ex_cost_sum_predicted = await predictARIMA(timeSeriesData.ex_cost_sum, timeSeriesData.ex_cost_sum.length + predictYearsCount * 12);
  timeSeriesData.im_cost_sum_predicted = await predictARIMA(timeSeriesData.im_cost_sum, timeSeriesData.im_cost_sum.length + predictYearsCount * 12);

  return {
    labels,
    timeSeriesData,
  };
  // await fs.writeFile(`./out/ts-${tnved}.json`, JSON.stringify(timeSeries));
  // const labels = timeSeries.map(el => `${el.month}.${el.year}`);

  //
  // const timeSeriesDataMeta = {
  //   ex_notes_count: {
  //     borderColor: ['rgb(51, 204, 204)']
  //   },
  //   im_notes_count: {
  //     borderColor: ['rgb(255, 102, 255)'],
  //   },
  //   ex_cost_sum: {
  //     borderColor: ['rgb(51, 204, 204)']
  //   },
  //   im_cost_sum: {
  //     borderColor: ['rgb(255, 102, 255)'],
  //   },
  //   ex_kol_sum: {
  //     borderColor: ['rgb(51,105,204)']
  //   },
  //   im_kol_sum: {
  //     borderColor: ['rgb(9,25,74)'],
  //   },
  //   ex_cost_by_one_kol_avg: {
  //     borderColor: ['rgb(97,169,95)']
  //   },
  //   im_cost_by_one_kol_avg: {
  //     borderColor: ['rgb(35,88,9)'],
  //   },
  //   ex_cost_by_one_note_avg: {
  //     borderColor: ['rgb(244,19,44)']
  //   },
  //   im_cost_by_one_note_avg: {
  //     borderColor: ['rgb(90,6,6)'],
  //   },
  // };
  //
  // const chartDatasetsKeys1 = ['ex_notes_count', 'im_notes_count', 'ex_kol_sum', 'im_kol_sum'];
  // const chartDatasetsKeys2 = ['ex_cost_sum', 'im_cost_sum', 'ex_cost_by_one_kol_avg', 'im_cost_by_one_kol_avg', 'ex_cost_by_one_note_avg', 'im_cost_by_one_note_avg'];
  //
  // const datasets1 = chartDatasetsKeys1.map(k => ({
  //   label: k,
  //   data: timeSeriesData[k],
  //   fill: false,
  //   borderColor: timeSeriesDataMeta[k].borderColor,
  //   borderWidth: 1,
  //   xAxisID: 'xAxis1', // define top or bottom axis, modifies on scale
  // }));
  //
  // const datasets2 = chartDatasetsKeys2.map(k => ({
  //   label: k,
  //   data: timeSeriesData[k],
  //   fill: false,
  //   borderColor: timeSeriesDataMeta[k].borderColor,
  //   borderWidth: 1,
  //   xAxisID: 'xAxis1', // define top or bottom axis, modifies on scale
  // }));
  //
  // function createConfiguration(datasets) {
  //   return {
  //     type: 'line', // for line chart
  //     data: {
  //       labels,
  //       datasets,
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           suggestedMin: 0,
  //         }
  //       }
  //     }
  //   };
  // }
  //
  // const configuration1 = createConfiguration(datasets1);
  // const configuration2 = createConfiguration(datasets2);
  //
  // const chartData1 = await chart.generateChart(configuration1);
  // const chartData2 = await chart.generateChart(configuration2);
  //
  // await fs.writeFile(`./out/ts-${tnved}-1.png`, chartData1, 'base64');
  // await fs.writeFile(`./out/ts-${tnved}-2.png`, chartData2, 'base64');
}

function calcPeriodVolumeEnd(volumeStart, k) {
  return - volumeStart / k;
}

function calcVolume(volumeStart, period, k) {
  let p = period;
  const periodVolumeEnd = calcPeriodVolumeEnd(volumeStart, k)
  if (k < 0 && period > periodVolumeEnd) {
    p = periodVolumeEnd;
  }
  return (p + 1) * (volumeStart + p * k / 2);
}

export async function analyzeDataset(items, predictYearsCount) {
  const trend = calcTrend(items.map(el => parseFloat(el.im_cost_sum)).map((el, i) => ({x: i, y: el})));
  const volumeROI = calcVolume(trend.yStart, predictYearsCount, trend.slope);
  return {
    volumeROI,
    k: trend.yStart,
    v0: trend.slope,
  };
}

export async function predict(items, predictYearsCount = 5) {
  // const startYear = 2019;
  // TODO: calc
  const itemsImportFriendly = [];
  const itemsImportNonFriendly = [];
  const itemsExportFriendly = [];
  const itemsExportNonFriendly = [];
  const itemsOrganizationsIncomes = [];

  const statImportFriendly = analyzeDataset(itemsImportFriendly, predictYearsCount);
  const statImportNonFriendly = analyzeDataset(itemsImportNonFriendly, predictYearsCount);
  const statExportFriendly = analyzeDataset(itemsExportFriendly, predictYearsCount);
  const statExportNonFriendly = analyzeDataset(itemsExportNonFriendly, predictYearsCount);
  const statOrganizationsIncomes = analyzeDataset(itemsOrganizationsIncomes, predictYearsCount);

  const res = {
    ifk: statImportFriendly.k,
    ifv: statImportFriendly.volumeROI,
    ifv0: statImportFriendly.v0,
    iek: statImportNonFriendly.k,
    iev: statImportNonFriendly.volumeROI,
    iev0: statImportNonFriendly.v0,
    efk: statExportFriendly.k,
    efv: statExportFriendly.volumeROI,
    efv0: statExportFriendly.v0,
    eek: statExportNonFriendly.k,
    eev: statExportNonFriendly.volumeROI,
    eev0: statExportNonFriendly.v0,
    ck: statOrganizationsIncomes.k,
    cv: statOrganizationsIncomes.volumeROI,
    cv0: statOrganizationsIncomes.v0,
    orgCount: null,
    indexLIBOBO: null,
  };

  res.indexLIBOBO = (res.cv * 4 + res.iev * 10 * res.ifv * 2 - res.efv * 3 - res.eev * 3) * (res.ck * 5 + res.efk + res.eek);

  return res;
}

export default {
  fetchMeta,
  analyze,
  exponentialSmoothing,
};
