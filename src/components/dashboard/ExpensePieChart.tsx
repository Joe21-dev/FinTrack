import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import Card from '../ui/Card';
import { ChartData as ChartDataType } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
  data: ChartDataType;
}

const CHART_COLORS = [
  '#4A90E2', // primary
  '#4DB6AC', // secondary
  '#FFF176', // accent
  '#FF7043', // orange
  '#9575CD', // purple
  '#4FC3F7', // light blue
  '#81C784', // light green
  '#FFB74D', // light orange
  '#BA68C8', // light purple
  '#E57373', // light red
];

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data }) => {
  const chartData: ChartData<'pie'> = {
    labels: data.labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
    datasets: [
      {
        data: data.values,
        backgroundColor: CHART_COLORS.slice(0, data.labels.length),
        borderColor: new Array(data.labels.length).fill('#fff'),
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Inter',
            size: 12,
          },
          color: document.documentElement.classList.contains('dark') ? '#fff' : '#333',
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Inter',
          size: 14,
        },
        bodyFont: {
          family: 'Inter',
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <Card title="Expenses by Category" className="h-full">
      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default ExpensePieChart;