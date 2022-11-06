import {promises as fs} from 'fs';
import {createRequire} from 'module';
import {
  fetchMeta,
  analyze,
} from './index.js';
import arima from './arima.js';
import nostradamus from './nostradamus.js';
import chart from './chart.js';
import {calcTrend, LinearRegression} from "./trend.js";

const require = createRequire(import.meta.url);
const exists = async path => !!(await fs.stat(path).catch(e => false));

if (!(await exists('out'))) {
  await fs.mkdir('out');
}

const runner = {
  async fetchMeta() {
    const data = await fetchMeta();
    await fs.writeFile('./out/meta.json', JSON.stringify(data));
  },
  async analyze() {
    await analyze();
  },
  async genSampleChart() {
    const data = await chart.sample();
    await fs.writeFile('./out/sample.png', data, 'base64');
  },
  async checkARIMA() {
    const ts = Array(30).fill(0).map((_, i) => i + 10 + Math.random() - 0.5)
    console.log(ts);
    let predicttion = await arima.predictARIMA(ts, 10);
    console.log('1', predicttion);
    predicttion = await arima.predictAutoARIMA(ts, 10);
    console.log('2', predicttion);
  },
  async checkNostradamus() {
    // nostradamus
    const ts = Array(30).fill(0).map((_, i) => i + 10 + Math.random() / 5)
    console.log(ts);
    const prediction = nostradamus.uncertainPredictions(ts).predictions;
    console.log(prediction);
  },
  async checkTrend() {
    const data = [
      { y: 2, x: 1 },
      { y: 4, x: 2 },
      { y: 5, x: 3 },
      { y: 4, x: 4 },
      { y: 5, x: 5 },
    ];
    const trend = calcTrend(data, 'x', 'y');
    console.log('calcTrend', trend);

    // const data2 = [];
    // for(let x = 1.0; x < 100.0; x += 1.0) {
    //   const y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random();
    //   data2.push([x, x * x, y]); // Note that the last column should be y the output
    // }
    // const r = new LinearRegression({
    //   alpha: 0.001, //
    //   iterations: 300,
    //   lambda: 0.0
    // });
    // const model = r.fit(data2);
    // console.log('LinearRegression', model);
    // // const testingData = [];
    // for(let x = 1.0; x < 5; x += 1.0) {
    //   const actual_y = 2.0 + 5.0 * x + 2.0 * x * x + Math.random();
    //   const predicted_y = r.transform([x, x * x]);
    //   console.log("actual: " + actual_y + " predicted: " + predicted_y);
    // }
  },
};

runner[process.argv[2]]();
