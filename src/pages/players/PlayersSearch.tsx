import { ChangeEvent, FC, startTransition, useState } from 'react';

import { PlayersListSearch } from "./PlayersListSearch";
import { AutocompleteLogs } from "../../widgets/header/AutocompleteLogs";

export const PlayersSearch: FC = () => {
	const [search, setSearch] = useState<string>('');
	const [delayedSearch, setDelayedSearch] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setSearch(value);

		startTransition(() => {
			setDelayedSearch(value);
		});
	};

	return (
		<div className="flex">
			<div className="flex flex__column max-width">
				<div className="players-input">
					<input className="input-search" value={search} onChange={handleChange} />
				</div>
				<div className="flex max-width">
					<AutocompleteLogs filter={search} delayedFilter={delayedSearch} />
					<PlayersListSearch delayedSearch={delayedSearch} />
				</div>
			</div>
		</div>
	);
};
