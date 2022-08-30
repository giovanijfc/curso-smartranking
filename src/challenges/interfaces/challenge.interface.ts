import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from '../enums/challenge-status.enum';

export interface Challenge extends Document {
  challengeDate: Date;
  solicitationDate: Date;
  responseDate: Date;
  status: ChallengeStatus;
  requester: Player;
  category: string;
  players: Array<Player>;
  game: Game;
}

export interface Game extends Document {
  category: string;
  players: Array<Player>;
  defender: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
