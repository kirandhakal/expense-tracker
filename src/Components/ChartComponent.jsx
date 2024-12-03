import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';

function ChartComponent({ transactions }) {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: transactions.map(trx => trx.name),
        datasets: [{
          label: 'Transactions',
          data: transactions.map(trx => trx.amount),
          backgroundColor: 'rgb(75, 192, 192)',
        }]
      }
    });
    return () => chart.destroy();
  }, [transactions]);

  return <canvas id="myChart" />;
}

export default ChartComponent;
