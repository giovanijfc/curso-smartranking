import * as mongoose from 'mongoose';
import { Player } from './player.interface';

export const PlayerSchema = new mongoose.Schema<Player>(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    positionRanking: { type: Number },
    urlPhotoPlayer: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
