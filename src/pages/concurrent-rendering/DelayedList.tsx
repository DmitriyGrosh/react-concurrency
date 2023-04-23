import React, { FC, memo } from 'react';
import {sleep} from "../../lib/sleep";

export const DelayedList: FC<{ list: string[] }> = memo(({ list }) => {
	sleep(400);
	return (
		<ol>
			{list.map((el, index) => (
				<li key={index}>Delayed - {el}</li>
			))}
		</ol>
	);
});
