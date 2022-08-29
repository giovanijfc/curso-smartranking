import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createAndUpdate(playerDTO: CreatePlayerDTO) {
    const findedPlayer = this.players.find(
      (player) => player.email === playerDTO.email,
    );

    if (findedPlayer) {
      return this.update(playerDTO, findedPlayer);
    }

    return this.create(playerDTO);
  }

  async getAll() {
    return this.players;
  }

  async getPlayerByEmail(email: string) {
    const findedPlayer = this.players.find((player) => player.email === email);

    if (!findedPlayer) {
      throw new NotFoundException(`Jogador com ${email} não encontrado`);
    }

    return findedPlayer;
  }

  async deleteByEmail(email: string) {
    const findedPlayer = this.players.find((player) => player.email === email);

    if (!findedPlayer) {
      throw new NotFoundException(`Jogador com ${email} não encontrado`);
    }

    this.players = this.players.filter((player) => player.email !== email);
  }

  private create(playerDTO: CreatePlayerDTO) {
    const { name, email, phoneNumber } = playerDTO;

    const createdPlayer: Player = {
      _id: uuidv4(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      positionRanking: 1,
      urlPhotoPlayer: 'www.google.com.br/photo123.jpg',
    };

    this.players.push(createdPlayer);

    return createdPlayer;
  }

  private update(playerDTO: CreatePlayerDTO, findedPlayer: Player) {
    const { name } = playerDTO;

    findedPlayer.name = name;

    return findedPlayer;
  }
}
