import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from '../enums/challenge-status.enum';
import { Game } from './game.interface';

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
