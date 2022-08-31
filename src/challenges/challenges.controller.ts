import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationParametersPipe } from 'src/common/pipes/validation-parameters.pipe';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createChallengeDTO: CreateChallengeDTO) {
    return this.challengesService.create(createChallengeDTO);
  }

  @Get()
  async get(@Query('playerId') playerId?: string) {
    return this.challengesService.getAllOrByPlayerId(playerId);
  }

  @Put('/:challengeId')
  @UsePipes(ValidationPipe)
  async updateById(
    @Body() updateChallengeDTO: UpdateChallengeDTO,
    @Param('challengeId', ValidationParametersPipe) challengeId: string,
  ) {
    return this.challengesService.updateById(challengeId, updateChallengeDTO);
  }

  @Delete('/:challengeId')
  async deleteById(
    @Param('challengeId', ValidationParametersPipe) challengeId: string,
  ) {
    return this.challengesService.deleteById(challengeId);
  }
}
