import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async createAndUpdate(playerDTO: CreatePlayerDTO) {
    const findedPlayer = await this.playerModel
      .findOne({
        email: playerDTO.email,
      })
      .exec();

    if (findedPlayer) {
      return this.update(playerDTO);
    }

    return this.create(playerDTO);
  }

  async getAll() {
    return await this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string) {
    const findedPlayer = await this.playerModel
      .findOne({
        email,
      })
      .exec();

    if (!findedPlayer) {
      throw new NotFoundException(`Jogador com ${email} não encontrado`);
    }

    return findedPlayer;
  }

  async deleteByEmail(email: string) {
    return await this.playerModel.remove({ email }).exec();
  }

  private async create(playerDTO: CreatePlayerDTO) {
    const createdPlayer = new this.playerModel(playerDTO);

    return await createdPlayer.save();
  }

  private async update(playerDTO: CreatePlayerDTO) {
    return await this.playerModel
      .findOneAndUpdate(
        {
          email: playerDTO.email,
        },
        { $set: playerDTO },
      )
      .exec();
  }
}
