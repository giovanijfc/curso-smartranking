import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.categoriesService.create(createCategoryDTO);
  }

  @Get('/all')
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Get('/:category')
  async getById(@Param('category') category: string) {
    return this.categoriesService.getById(category);
  }
}
