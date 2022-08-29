import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

const MongooseModuleInstance = MongooseModule.forFeature([
  { name: 'Player', schema: PlayerSchema },
]);

@Module({
  imports: [MongooseModuleInstance],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
