import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import Card from '../ui/Card';
import { ChartData as ChartDataType } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MonthlyBalanceChartProps {
  data: ChartDataType;
}

const MonthlyBalanceChart: React.FC<MonthlyBalanceChartProps> = ({ data }) => {
  const chartData: ChartData<'line'> = {
    labels: data.labels,
    datasets: [
      {
        label: 'Monthly Balance',
        data: data.values,
        fill: true,
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderColor: '#4A90E2',
        tension: 0.4,
        pointBackgroundColor: '#4A90E2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#666666',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#666666',
          font: {
            family: 'Inter',
            size: 12,
          },
          callback: function(value) {
            return '$' + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <Card title="Monthly Balance Trend" className="h-full">
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default MonthlyBalanceChart;