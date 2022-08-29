import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createAndUpdatePlayer() {
    return JSON.stringify({
      status: 'live',
      date: new Date().toISOString(),
    });
  }
}
