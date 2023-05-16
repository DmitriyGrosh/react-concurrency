import {
	memo,
	FC,
	useEffect,
	useState,
	useTransition,
} from 'react';

import { IGetPlayers, IPlayer } from './interfaces';
import { getPlayers } from './resource';

import { Statistics } from './Statistics';
import { Logs } from '../../widgets/header/Logs';


import './Players.scss';
import {list} from "../../lib/const";
import {sleep} from "../../lib/sleep";

export const PlayersListSearch: FC<{ delayedSearch: string }> = memo(({ delayedSearch }) => {
	const [lowPriorityPlayer, setLowPriorityPlayer] = useState<IPlayer | null>(null);
	const [highPriorityPlayer, setHighPriorityPlayer] = useState<IPlayer | null>(null);
	const [playersArray, setPlayersArray] = useState<IGetPlayers[]>([]);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		const initData = async () => {
			const players = await getPlayers(33);

			setPlayersArray(players);
		};

		initData();
	}, []);

	const handlePlayerClick = (player: IPlayer) => {
		setHighPriorityPlayer(player);

		// concurrent rendering
		startTransition(() => {
			setLowPriorityPlayer(player);
		});
	};

	const title = 'Concurrent rendering';
	const filteredList = (players: IPlayer[]) =>  players.filter((el) => el.name.toLowerCase().includes(delayedSearch.toLowerCase()));

	sleep(1000, delayedSearch);

	return (
		<div>
			<h3>{title}</h3>
			<div className="flex max-width">
				<div className="players-list max-width">
					<ul className="players-list__menu">
						{playersArray?.map(({players}) => filteredList(players).map((player) => {
							const isSelected = lowPriorityPlayer && lowPriorityPlayer.id === player.id;

							return (
								<li key={player.id}>
									<button
										onClick={() => handlePlayerClick(player)}
										className={`player-list__player-btn ${
											isSelected ? "player-list__player-btn--selected" : ""
										}`}>
										{player.name}
									</button>
								</li>
							);
						}))}
					</ul>
					{lowPriorityPlayer ? <Statistics id={lowPriorityPlayer.id} /> : <div>Not selected Player</div>}
				</div>
			</div>
		</div>
	);
});
