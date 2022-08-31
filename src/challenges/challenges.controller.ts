import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';

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
}
