import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { Result } from '../interfaces/game.interface';

export class LinkGameInChallengeDTO {
  @IsNotEmpty()
  defenderId: string;

  @IsArray()
  @ArrayMinSize(1)
  results: Array<Result>;
}
