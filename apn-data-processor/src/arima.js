import ARIMAPromise from 'arima/async.js';

// node_modules/arima/load.js
// const params = {
//   p: 1,
//   d: 0,
//   q: 1,
//   P: 0,
//   D: 0,
//   Q: 0
// }
// const paramsAuto = {
//   p: 5,
//   d: 2,
//   q: 5,
//   P: 2,
//   D: 1,
//   Q: 2
// }

export function predictARIMA(ts, count = 10) {
  return ARIMAPromise.then(ARIMA => {
    const arima = new ARIMA({
      p: 0,
      d: 1,
      q: 0,

      // p: 1,
      // d: 0,
      // q: 1,
      // P: 2,
      // D: 1,
      // Q: 2,

      // p: 5,
      // d: 2,
      // q: 5,
      // P: 2,
      // D: 1,
      // Q: 2,

      // p: 2,
      // d: 1,
      // q: 2,
      // P: 0,
      // D: 0,
      // Q: 0,

      // p: 1,
      // d: 0,
      // q: 1,
      // P: 0,
      // D: 0,
      // Q: 0,
      S: 4,
      verbose: false,
    }).train(ts)
    const [pred, errors] = arima.predict(count);
    return pred;
  })
}

export function predictAutoARIMA(ts, count = 10) {
  return ARIMAPromise.then(ARIMA => {
    const arima = new ARIMA({ auto: true }).fit(ts);
    const [pred, errors] = arima.predict(count);
    return pred;
  })
}

export default {
  predictARIMA,
  predictAutoARIMA,
};


