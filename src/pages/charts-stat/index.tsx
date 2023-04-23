import React from 'react';
import { useParams } from "react-router-dom";
import { AxisOptions, Chart } from "react-charts";
import useDemoConfig from "./useDemoConfig";

type DailyStars = {
	date: Date,
	stars: number,
}

type Series = {
	label: string,
	data: DailyStars[]
}

const data: Series[] = [
	{
		label: 'React Charts',
		data: [
			{
				date: new Date(),
				stars: 202123,
			}
			// ...
		]
	},
	{
		label: 'React Query',
		data: [
			{
				date: new Date(),
				stars: 10234230,
			}
			// ...
		]
	}
]

export const ChartsStat = () => {
	const { count } = useParams();
	const { data, randomizeData } = useDemoConfig({
		series: 10,
		dataType: "time",
	});

	const primaryAxis = React.useMemo<
		AxisOptions<typeof data[number]["data"][number]>
	>(
		() => ({
			getValue: (datum) => datum.primary as unknown as Date,
		}),
		[]
	);

	const secondaryAxes = React.useMemo<
		AxisOptions<typeof data[number]["data"][number]>[]
	>(
		() => [
			{
				getValue: (datum) => datum.secondary,
			},
		],
		[]
	);

	return (
		<Chart
			options={{
				data,
				primaryAxis,
				secondaryAxes,
			}}
		/>
	)
}
