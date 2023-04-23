import { ChangeEvent, FC, useState, useTransition } from 'react';

import { PlayersList } from "./PlayersList";
import {Logs} from "../../widgets/header/Logs";
import {IPlayer} from "./interfaces";
import {useParams} from "react-router-dom";
import {useDebug} from "../../lib/useDebug";

export const Players: FC = () => {
  const { type } = useParams();

  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [syncSelectedPlayer, setSyncSelectedPlayer] = useState<IPlayer | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePlayerClick = (player: IPlayer) => {
    if (type === 'sync') {
      // blocking rendering
      setSelectedPlayer(player);
    }

    if (type === 'async') {
      // adapt
      setTimeout(() => {
        setSelectedPlayer(player);
      }, 0);
    }

    if (type === 'concurrent') {
      setSyncSelectedPlayer(player);
      // concurrent rendering
      startTransition(() => {
        setSelectedPlayer(player);
      });
    }
  };

  // useDebug({ filter: syncSelectedPlayer?.name, delayedFilter: selectedPlayer?.name})

  return (
    <div className="flex">
      <div className="flex flex__column max-width">
        {/*<div><input value={search} onChange={handleChange} /></div>*/}
        <PlayersList selectedPlayer={selectedPlayer} handlePlayerClick={handlePlayerClick}>
          <Logs filter={syncSelectedPlayer?.name} delayedFilter={selectedPlayer?.name} />
        </PlayersList>
      </div>
    </div>
  );
};
