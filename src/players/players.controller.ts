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
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';
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
    @Param('id', PlayersValidationParametersPipe) id: string,
    @Body() playerDTO: UpdatePlayerDTO,
  ) {
    return this.playersService.updateById(id, playerDTO);
  }

  @Get('all')
  async getAll() {
    return this.playersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', PlayersValidationParametersPipe) id: string) {
    return this.playersService.getById(id);
  }

  @Delete('/:id')
  async deleteById(@Param('id', PlayersValidationParametersPipe) id: string) {
    return this.playersService.deleteById(id);
  }
}
