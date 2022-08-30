import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
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
    return this.categoryModel.find().exec();
  }

  async getById(category: string) {
    const findedCategory = await this.categoryModel
      .findOne({
        category,
      })
      .exec();

    if (findedCategory) {
      return findedCategory;
    }

    throw new NotFoundException(`Categoria ${category} não encontrada.`);
  }
}
