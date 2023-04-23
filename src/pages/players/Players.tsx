import { FC } from 'react';

import { PlayersList } from './PlayersList';

export const Players: FC = () => {
  return (
    <div className="flex">
      <div className="flex flex__column max-width">
        {/*<div><input value={search} onChange={handleChange} /></div>*/}
        <PlayersList />
      </div>
    </div>
  );
};
