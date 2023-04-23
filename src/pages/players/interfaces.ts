interface ICards {
  yellow: number;
  yellowred: number;
  red: number;
}

interface IDribbles {
  attempts: number;
  success: number;
  past: null | number;
}

interface IDuels {
  total: 202;
  won: 130;
}

interface IFouls {
  drawn: 31;
  committed: 16;
}

interface IGames {
  appearences: number;
  lineups: number;
  minutes: number;
  number: null | number;
  position: string;
  rating: string;
  captain: boolean;
}

interface IGoals {
  total: number;
  conceded: number;
  assists: number;
  saves: null | number;
}

interface ILeague {
  "id": number;
  "name": string;
  "country": string;
  "logo": string;
  "flag": string;
  "season": number;
}

interface IPasses {
  total: number;
  key: number;
  accuracy: number;
}

interface IPenalty {
  won: null | number;
  commited: null | number;
  scored: number;
  missed: number;
  saved: null | number;
}

interface IShots {
  total: number;
  on: number;
}

interface ISubstitutes {
  in: number;
  out: number;
  bench: number;
}

interface ITackles {
  total: number;
  blocks: number;
  interceptions: number;
}

interface IStatistics {
  cards: ICards;
  dribbles: IDribbles;
  duels: IDuels;
  fouls: IFouls;
  games: IGames;
  goals: IGoals
  league: ILeague;
  passes: IPasses;
  penalty: IPenalty;
  shots: IShots;
  substitutes: ISubstitutes;
  tackles: ITackles;
  team: ITeam;
}

export interface IPlayer {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

interface ITeam {
  id: number
  name: string;
  logo: string;
}

export interface IGetPlayers {
  team: ITeam;
  players: IPlayer[];
}

export interface IPlayerStatistics {
  player: IPlayer;
  statistics: IStatistics[];
}
