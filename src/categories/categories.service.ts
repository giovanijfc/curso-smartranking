import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async create(createCategoryDTO: CreateCategoryDTO) {
    const { category } = createCategoryDTO;

    const findedCategory = await this.categoryModel
      .findOne({ category })
      .exec();

    if (!findedCategory) {
      const createCategory = new this.categoryModel(createCategoryDTO);
      return await createCategory.save();
    }

    throw new BadRequestException(
      `A categoria ${category} já está cadastrada.`,
    );
  }

  async getAll() {
    return this.categoryModel.find().populate('players').exec();
  }

  async getById(category: string) {
    const findedCategory = await this.categoryModel
      .findOne({
        category,
      })
      .populate('players')
      .exec();

    if (findedCategory) {
      return findedCategory;
    }

    throw new NotFoundException(`Categoria ${category} não encontrada.`);
  }

  async update(category: string, updateCategoryDTO: UpdateCategoryDTO) {
    const findedCategory = await this.categoryModel
      .findOne({
        category,
      })
      .exec();

    if (findedCategory) {
      return await this.categoryModel
        .updateOne({ category }, { $set: updateCategoryDTO })
        .exec();
    }

    throw new NotFoundException(`Categoria ${category} não encontrada.`);
  }

  async linkPlayerInCategory(category: string, playerId: string) {
    const findedCategory = await this.categoryModel
      .findOne({
        category,
      })
      .exec();

    if (!findedCategory) {
      throw new BadRequestException(`Categoria ${category} não encontrada.`);
    }

    await this.playersService.getById(playerId);

    const findedPlayerAlreadyLinkedInCategory = await this.categoryModel
      .findOne({
        category,
      })
      .where('players')
      .in(playerId as any)
      .exec();

    if (findedPlayerAlreadyLinkedInCategory) {
      throw new BadRequestException(
        `Jogador com id ${playerId} já cadastrado na categoria ${category}.`,
      );
    }

    findedCategory.players.push(playerId as any);
    await this.categoryModel
      .updateOne({ category }, { $set: findedCategory })
      .exec();
  }

  async getCategoryByPlayerId(playerId: string) {
    return await this.categoryModel
      .findOne()
      .where('players')
      .in(playerId as any)
      .exec();
  }
}
