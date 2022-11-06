function getAvg(arr) {
  const total = arr.reduce((acc, c) => acc + c, 0);
  return total / arr.length;
}

function getSum(arr) {
  return arr.reduce((acc, c) => acc + c, 0);
}

export function calcTrend(data, xKey = 'x', yKey = 'y') {
  const xData = data.map((value) => value[xKey]);
  const yData = data.map((value) => value[yKey]);

  // average of X values and Y values
  const xMean = getAvg(xData);
  const yMean = getAvg(yData);

  // Subtract X or Y mean from corresponding axis value
  const xMinusxMean = xData.map((val) => val - xMean);
  const yMinusyMean = yData.map((val) => val - yMean);

  const xMinusxMeanSq = xMinusxMean.map((val) => Math.pow(val, 2));

  const xy = [];
  for (let x = 0; x < data.length; x++) {
    xy.push(xMinusxMean[x] * yMinusyMean[x]);
  }

  // const xy = xMinusxMean.map((val, index) => val * yMinusyMean[index]);

  const xySum = getSum(xy);

  // b1 is the slope
  const b1 = xySum / getSum(xMinusxMeanSq);
  // b0 is the start of the slope on the Y axis
  const b0 = yMean - b1 * xMean;

  return {
    slope: b1,
    yStart: b0,
    calcY: (x) => b0 + b1 * x,
  };
}

export class LinearRegression {
  constructor(config) {
    config = config || {};

    if (!config.iterations) {
      config.iterations = 1000;
    }
    if (!config.alpha) {
      config.alpha = 0.001;
    }
    if (!config.lambda) {
      config.lambda = 0.0;
    }
    if (!config.trace) {
      config.trace = false;
    }

    this.iterations = config.iterations;
    this.alpha = config.alpha;
    this.lambda = config.lambda;
    this.trace = config.trace;
  }

  fit(data) {
    const N = data.length, X = [], Y = [];
    this.dim = data[0].length;


    for (let i = 0; i < N; ++i) {
      const row = data[i];
      const x_i = [];
      const y_i = row[row.length - 1];
      x_i.push(1.0);
      for (let j = 0; j < row.length - 1; ++j) {
        x_i.push(row[j]);
      }
      Y.push(y_i);
      X.push(x_i);
    }

    this.theta = [];

    for (let d = 0; d < this.dim; ++d) {
      this.theta.push(0.0);
    }

    for (let k = 0; k < this.iterations; ++k) {
      const Vx = this.grad(X, Y, this.theta);

      for (let d = 0; d < this.dim; ++d) {
        this.theta[d] = this.theta[d] - this.alpha * Vx[d];
      }

      if (this.trace) {
        console.log('cost at iteration ' + k + ': ' + this.cost(X, Y, this.theta));
      }
    }

    return {
      theta: this.theta,
      dim: this.dim,
      cost: this.cost(X, Y, this.theta),
      config: {
        alpha: this.alpha,
        lambda: this.lambda,
        iterations: this.iterations
      }
    };
  }

  grad(X, Y, theta) {
    const N = X.length;

    const Vtheta = [];

    for (let d = 0; d < this.dim; ++d) {
      let g = 0;
      for (let i = 0; i < N; ++i) {
        const x_i = X[i];
        const y_i = Y[i];

        const predicted = this.h(x_i, theta);

        g += (predicted - y_i) * x_i[d];
      }

      g = (g + this.lambda * theta[d]) / N;

      Vtheta.push(g);
    }

    return Vtheta;
  }

  h(x_i, theta) {
    let predicted = 0.0;
    for (let d = 0; d < this.dim; ++d) {
      predicted += x_i[d] * theta[d];
    }
    return predicted;
  }

  cost(X, Y, theta) {
    const N = X.length;
    let cost = 0;
    for (let i = 0; i < N; ++i) {
      const x_i = X[i];
      const predicted = this.h(x_i, theta);
      cost += (predicted - Y[i]) * (predicted - Y[i]);
    }

    for (let d = 0; d < this.dim; ++d) {
      cost += this.lambda * theta[d] * theta[d];
    }

    return cost / (2.0 * N);
  }

  transform(x) {
    if (x[0].length) { // x is a matrix
      const predicted_array = [];
      for (let i = 0; i < x.length; ++i) {
        const predicted = this.transform(x[i]);
        predicted_array.push(predicted);
      }
      return predicted_array;
    }

    // x is a row vector
    const x_i = [];
    x_i.push(1.0);
    for (let j = 0; j < x.length; ++j) {
      x_i.push(x[j]);
    }
    return this.h(x_i, this.theta);
  }
}

export default {
  calcTrend,
  LinearRegression,
};
