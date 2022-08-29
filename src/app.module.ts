import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

const MoongoseModuleInstance = MongooseModule.forRoot(
  'mongodb+srv://admin:5QpjMRbH2ukYESfb@cluster1.brzvzgk.mongodb.net/smart_ranking?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  },
);

@Module({
  imports: [MoongoseModuleInstance, PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
