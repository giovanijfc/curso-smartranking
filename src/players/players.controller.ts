import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createAndUpdate(@Body() playerDTO: CreatePlayerDTO) {
    return this.playersService.createAndUpdate(playerDTO);
  }

  @Get()
  async getAllOrOneByEmail(@Query('email') email: string) {
    if (email) {
      return this.playersService.getPlayerByEmail(email);
    }

    return this.playersService.getAll();
  }

  @Delete()
  async deleteByEmail(@Query('email') email: string) {
    return this.playersService.deleteByEmail(email);
  }
}
