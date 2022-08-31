import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';
import { ChallengeStatus } from './enums/challenge-status.enum';
import { Challenge } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createChallengeDTO: CreateChallengeDTO) {
    const { playersIds } = createChallengeDTO;

    if (playersIds[0] === playersIds[1]) {
      throw new BadRequestException(
        'O solicitante e desafiados precisam ser jogadores diferentes.',
      );
    }

    await this.playersService.getById(playersIds[0] as unknown as string);
    await this.playersService.getById(playersIds[1] as unknown as string);

    const requesterIsPlayerOfGame = playersIds.find(
      (playerId) => playerId === createChallengeDTO.requesterId,
    );

    if (!requesterIsPlayerOfGame) {
      throw new BadRequestException(
        'O solicitante deve ser um jogador da partida.',
      );
    }

    const requesterPlayerCategory =
      await this.categoriesService.getCategoryByPlayerId(
        createChallengeDTO.requesterId,
      );

    if (!requesterPlayerCategory) {
      throw new BadRequestException(
        'O solicitante precisa estar registrado em uma categoria.',
      );
    }

    const createdChallenge = new this.challengeModel({
      ...createChallengeDTO,
      players: playersIds,
      category: requesterPlayerCategory.category,
      solicitationDate: new Date(),
      status: ChallengeStatus.PENDING,
      requester: createChallengeDTO.requesterId,
    });

    return await createdChallenge.save();
  }

  async getAllOrByPlayerId(playerId?: string) {
    if (playerId) {
      await this.playersService.getById(playerId);
      return await this.challengeModel
        .find({ players: playerId })
        .populate('players')
        .exec();
    }

    return await this.challengeModel.find().populate('players').exec();
  }

  async update(challengeId: string, updateChallengeDTO: UpdateChallengeDTO) {
    const findedChallenge = await this.challengeModel
      .findOne({ _id: challengeId })
      .exec();

    if (findedChallenge) {
      await this.challengeModel.findOneAndUpdate(
        { _id: challengeId },
        updateChallengeDTO,
      );
      return;
    }

    throw new NotFoundException(
      `Desafio com id ${challengeId} não encontrado.`,
    );
  }
}
