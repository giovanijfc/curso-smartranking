import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { ChallengeStatus } from '../enums/challenge-status.enum';

export class UpdateChallengeDTO {
  @IsIn([
    ChallengeStatus.ACCEPT,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELED,
  ])
  @IsNotEmpty()
  status: ChallengeStatus;

  @IsDateString()
  @IsNotEmpty()
  responseDate: Date;
}
