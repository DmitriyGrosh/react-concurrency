import { useEffect, useState, useDeferredValue } from 'react';

import { IGetPlayers, IPlayer } from '../players/interfaces';
import { getPlayers } from '../players/resource';

import { Statistics } from '../players/Statistics';

export const DeferredPlayerList = () => {
	const [highPriorityPlayer, setHighPriorityPlayer] = useState<IPlayer | null>(null);
	const [playersArray, setPlayersArray] = useState<IGetPlayers[]>([]);
	const lowPriorityPlayer = useDeferredValue(highPriorityPlayer);

	useEffect(() => {
		const initData = async () => {
			const players = await getPlayers(33);

			setPlayersArray(players);
		};

		initData();
	}, []);

	const handlePlayerClick = (player: IPlayer) => {
		setHighPriorityPlayer(player)
	};

	return (
		<div>
			<h3>Concurrent rendering</h3>
			<div className="flex max-width">
				<div className="players-list max-width">
					<ul className="players-list__menu">
						{playersArray?.map(({players}) => players.map((player) => {
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
};
