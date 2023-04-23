import {
  memo,
  FC,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { useParams } from 'react-router-dom';

import { IGetPlayers, IPlayer } from './interfaces';
import { getPlayers } from './resource';

import { Statistics } from './Statistics';
import { Logs } from '../../widgets/header/Logs';


import './Players.scss';

export const PlayersList: FC = memo(() => {
  const { type, isLogs } = useParams();
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
    if (type === 'sync') {
      // blocking rendering
      setLowPriorityPlayer(player);
    }

    if (type === 'async') {
      // adapt
      setTimeout(() => {
        setLowPriorityPlayer(player);
      }, 0);
    }

    if (type === 'concurrent') {
      setHighPriorityPlayer(player);

      // concurrent rendering
      startTransition(() => {
        setLowPriorityPlayer(player);
      });
    }
  };

  const title = type === 'sync' ? 'Blocking rendering' : type === 'async' ? 'Async Rendering' : 'Concurrent rendering';

  return (
    <div>
      <h3>{title}</h3>
      <div className="flex max-width">
        {isLogs === 'true' && <Logs filter={highPriorityPlayer?.name} delayedFilter={lowPriorityPlayer?.name} />}
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
});
