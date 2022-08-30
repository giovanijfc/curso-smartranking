import * as mongoose from 'mongoose';
import { Player } from './player.interface';

export const PlayerSchema = new mongoose.Schema<Player>(
  {
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    name: { type: String },
    ranking: { type: String },
    positionRanking: { type: Number },
    urlPhotoPlayer: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
