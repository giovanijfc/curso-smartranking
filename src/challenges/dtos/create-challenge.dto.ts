import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date;

  @IsNotEmpty()
  requesterId: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  playersIds: Array<string>;
}
