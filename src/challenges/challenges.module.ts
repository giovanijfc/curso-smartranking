import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from './interfaces/challenge.schema';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlayersModule } from 'src/players/players.module';

const MongooseModuleInstance = MongooseModule.forFeature([
  { name: 'Challenge', schema: ChallengeSchema },
]);

@Module({
  imports: [MongooseModuleInstance, PlayersModule, CategoriesModule],
  providers: [ChallengesService],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
