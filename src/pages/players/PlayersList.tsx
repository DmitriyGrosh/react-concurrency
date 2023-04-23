import {memo, FC, useEffect, useState, useTransition, PropsWithChildren} from 'react';
import { useParams } from 'react-router-dom';
import { Statistics } from './Statistics';

import { IGetPlayers, IPlayer } from './interfaces';
import { getPlayers } from './resource';

import './Players.scss';
import {useDebug} from "../../lib/useDebug";
import {Logs} from "../../widgets/header/Logs";

interface IPlayerList extends PropsWithChildren {
  selectedPlayer: IPlayer | null;
  handlePlayerClick: (player: IPlayer) => void;
}

export const PlayersList: FC<IPlayerList> = memo(({ selectedPlayer, handlePlayerClick, children }) => {
  const { type } = useParams();
  const [playersArray, setPlayersArray] = useState<IGetPlayers[]>([]);

  useEffect(() => {
    const initData = async () => {
      const players = await getPlayers(33);

      setPlayersArray(players);
    };

    initData();
  }, []);

  // const handlePlayerClick = (player: IPlayer) => {
  //   if (type === 'sync') {
  //     // blocking rendering
  //     setSelectedPlayer(player);
  //   }
  //
  //   if (type === 'async') {
  //     // adapt
  //     setTimeout(() => {
  //       setSelectedPlayer(player);
  //     }, 0);
  //   }
  //
  //   if (type === 'concurrent') {
  //     setSyncSelectedPlayer(player);
  //     // concurrent rendering
  //     startTransition(() => {
  //       setSelectedPlayer(player);
  //     });
  //   }
  // };

  // for autocomplete
  // sleep(1000);

  return (
    <div className="flex max-width">
      <div className="players-list max-width">
        <ul className="players-list__menu">
          {playersArray?.map(({players}) => players.map((player) => {
            const isSelected = selectedPlayer && selectedPlayer.id === player.id;

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
        {selectedPlayer ? <Statistics id={selectedPlayer.id} /> : <div>Not selected Player</div>}
      </div>
      {children}
    </div>
  );
});
