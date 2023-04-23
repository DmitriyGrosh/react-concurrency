import {FC, memo, useEffect, useLayoutEffect, useState} from 'react';
import { IPlayerStatistics } from './interfaces';
import { getPlayerStatistics } from './resource';
import { sleep } from '../../lib/sleep';

interface IStatistics {
  id: number;
}

const addFrame = (value: string) => {
  const logs = document.getElementById('logs');
  const span = document.createElement('span');

  span.textContent = value;
  // span.className = `logs__${type}`;

  logs?.appendChild(span);
};

export const Statistics: FC<IStatistics> = memo(({ id }) => {
  const [playerStatistics, setPlayerStatistics] = useState<IPlayerStatistics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    console.log('==========>effect', id);
    const initData = async () => {
      setIsLoading(true);
      const data = await getPlayerStatistics(id, 2022);

      setPlayerStatistics(data);
    };

    initData().finally(() => setIsLoading(false));
    // addFrame(`use effect statistics ${id}`)
  }, [id]);

  sleep(1000);

  if (isLoading) {
    return <div>Loading Statistics...</div>
  }

  return (
    <div className="player-stats">
      {!playerStatistics.length && (
        <p className="player-stats__no-games">has not played yet</p>
      )}

      {playerStatistics?.map(({ statistics, player }) => statistics.map((el) => (
        <div className="player-stats__game" key={`${el.league.name}-${el.league.season}-${id}-${el.team.name}`}>
          <div className="player-stats__game-header">
            <div className="player-stats__stat-var">
            </div>

            <div className="player-stats__stat-var">
              {el.games.minutes}
              <span className="player-stats__stat-label">min</span>
            </div>
          </div>

          <div className="player-stats__game-body">
            <>
              <div className="player-stats__stat-var">
                {el.goals.total}
                <span className="player-stats__stat-label">points</span>
              </div>

              <div className="player-stats__stat-var">
                {el.passes.total}
                <span className="player-stats__stat-label">rebounds</span>
              </div>

              <div className="player-stats__stat-var">
                {el.duels.total}
                <span className="player-stats__stat-label">assists</span>
              </div>

              <div className="player-stats__stat-var">
                {el.cards.yellowred}
                <span className="player-stats__stat-label">blocks</span>
              </div>
            </>
          </div>
        </div>
      )))}
    </div>
  );
});
