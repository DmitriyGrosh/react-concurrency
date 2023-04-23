import React, { FC } from 'react';

import { list } from "../../lib/const";
import { sleep } from "../../lib/sleep";


interface IList {
	search: string;
}

export const List: FC<IList> = ({ search }) => {
	const filteredList = list.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));

	sleep(200);

	return (
		<ul>
			{filteredList.map((el) => (
				<li key={el.id}>
					{el.name} - {el.price}
				</li>
			))}
		</ul>
	);
}
