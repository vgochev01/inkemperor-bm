import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = ({ chartData, title, yTitle }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: yTitle
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time Period'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    return (
        <div style={{ height: '400px' }}>
            {title && <h5>{title}</h5>}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default DataChart;
