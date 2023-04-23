import React from 'react';
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
import { data } from './data';
import { useParams } from "react-router-dom";

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
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Line Chart',
		},
	},
};

export const LineChartWorker = () => {
	const { count, type } = useParams<{ count: string, type: string }>();
	// @ts-ignore
	const labels = data[count].worker.map((_el, index) => `${index + 1} s`);

	const chart = {
		labels,
		datasets: [
			{
				label: 'Web Worker',
				// @ts-ignore
				data: data[count].worker.map((el) => el[type]),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Sync Rendering',
				// @ts-ignore
				data: data[count].normal.map((el) => el[type]),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return <Line options={options} data={chart} />;
}
