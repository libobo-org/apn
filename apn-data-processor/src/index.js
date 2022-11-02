import {makeClient} from './db.js';
import {loadSql} from './fs.js';
import {promises as fs} from 'fs';
import chart from './chart.js';

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

export async function analyze() {
  const tnved = '0102211000';
  // const tnved = '0102';
  let timeSeries = null;
  const client = await makeClient();
  try {
    const sql = await loadSql('tnved-time-series.sql');
    const res = await client.query(sql, [tnved.length, tnved]);
    timeSeries = res.rows;
    await client.end();
  } catch (e) {
    console.error('Errored tnved-time-series.sql');
    console.error(e);
    return;
  }
  await fs.writeFile(`./out/ts-${tnved}.json`, JSON.stringify(timeSeries));
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

  const chartData1 = await chart.generateChart(configuration1);
  const chartData2 = await chart.generateChart(configuration2);

  await fs.writeFile(`./out/ts-${tnved}-1.png`, chartData1, 'base64');
  await fs.writeFile(`./out/ts-${tnved}-2.png`, chartData2, 'base64');
}

export default {
  fetchMeta,
  analyze,
};
