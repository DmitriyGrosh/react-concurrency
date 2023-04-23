import { api } from "../../lib/api";
import { IGetPlayers, IPlayerStatistics } from "./interfaces";

type Response<T> = {
  response: T[]
}

export const getPlayers = async (team: number): Promise<IGetPlayers[]> => {
  const players = await api.get<Response<IGetPlayers>>('/players/squads', { params: { team } });

  return players.data.response;
};

export const getPlayerStatistics = async (id: number, season: number): Promise<IPlayerStatistics[]> => {
  const statistics = await api.get<Response<IPlayerStatistics>>('players', { params: { id, season } });

  return statistics.data.response;
}
