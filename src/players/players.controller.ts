import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { ValidationParametersPipe } from '../common/pipes/validation-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() playerDTO: CreatePlayerDTO) {
    return this.playersService.create(playerDTO);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateById(
    @Param('id', ValidationParametersPipe) id: string,
    @Body() playerDTO: UpdatePlayerDTO,
  ) {
    return this.playersService.updateById(id, playerDTO);
  }

  @Get('all')
  async getAll() {
    return this.playersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', ValidationParametersPipe) id: string) {
    return this.playersService.getById(id);
  }

  @Delete('/:id')
  async deleteById(@Param('id', ValidationParametersPipe) id: string) {
    return this.playersService.deleteById(id);
  }
}
