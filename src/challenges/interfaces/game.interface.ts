import { Player } from 'src/players/interfaces/player.interface';

export interface Game extends Document {
  category: string;
  players: Array<Player>;
  defender: Player;
  results: Array<Result>;
}

export interface Result {
  set: string;
}
