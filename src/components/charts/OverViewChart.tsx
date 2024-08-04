import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
           
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: 'white'
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                display: false
            }
        }
    }

};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = {
    labels: labels,
    datasets: [
        {
            label: 'My First dataset',
            data: [90, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 100],
            fill: false,
            borderColor: '#E6618C',
            tension: 0.2,
            backgroundColor: '#E6618C',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointBackgroundColor: '#534a92',
        },
    ],
};

const OverViewChart = () => {
    return (
        <Line options={options} data={data} />
    )
}

export default OverViewChart