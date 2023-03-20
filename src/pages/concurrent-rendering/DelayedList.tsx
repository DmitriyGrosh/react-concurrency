import React, { FC, memo } from 'react';

export const DelayedList: FC<{ list: string[] }> = memo(({ list }) => {
	return (
		<ol>
			{list.map((el) => (
				<li>Delayed - {el}</li>
			))}
		</ol>
	);
});
