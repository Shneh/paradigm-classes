const ctx = document.getElementById('graph-canvas').getContext('2d');
let chart;

function plotGraph() {
  const funcInput = document.getElementById('graph-function').value;

  // Generate data points
  const xValues = [];
  const yValues = [];

  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x.toFixed(2));
    try {
      // Use math.js or eval carefully; here we use a safe Function constructor:
      const f = new Function('x', 'with(Math) { return ' + funcInput + '; }');
      const y = f(x);
      yValues.push(y);
    } catch (e) {
      yValues.push(null);
    }
  }

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [{
        label: 'f(x) = ' + funcInput,
        data: yValues,
        borderColor: '#3b82f6',
        borderWidth: 2,
        fill: false,
        spanGaps: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true, title: { display: true, text: 'x' } },
        y: { display: true, title: { display: true, text: 'f(x)' } },
      }
    }
  });
}
