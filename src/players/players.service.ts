import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(playerDTO: CreatePlayerDTO) {
    const findedPlayer = await this.playerModel
      .findOne({
        email: playerDTO.email,
      })
      .exec();

    if (!findedPlayer) {
      const createdPlayer = new this.playerModel(playerDTO);
      return await createdPlayer.save();
    }

    throw new BadRequestException(
      `Jogador com ${playerDTO.email} já cadastrado.`,
    );
  }

  async updateById(id: string, playerDTO: UpdatePlayerDTO) {
    const findedPlayer = await this.playerModel
      .findOne({
        _id: id,
      })
      .exec();

    if (findedPlayer) {
      await this.playerModel
        .findOneAndUpdate(
          {
            _id: id,
          },
          { $set: playerDTO },
        )
        .exec();

      return;
    }

    throw new NotFoundException(`Jogador com ${id} não encontrado.`);
  }

  async getAll() {
    return await this.playerModel.find().exec();
  }

  async getById(id: string) {
    const findedPlayer = await this.playerModel
      .findOne({
        _id: id,
      })
      .exec();

    if (findedPlayer) {
      return findedPlayer;
    }

    throw new NotFoundException(`Jogador com ${id} não encontrado.`);
  }

  async deleteById(id: string) {
    return await this.playerModel.deleteOne({ _id: id }).exec();
  }
}
