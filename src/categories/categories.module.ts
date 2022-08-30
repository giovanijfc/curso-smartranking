import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './interfaces/category.schema';

const MongooseModuleInstance = MongooseModule.forFeature([
  { name: 'Category', schema: CategorySchema },
]);

@Module({
  imports: [MongooseModuleInstance],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}