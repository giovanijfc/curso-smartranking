import * as mongoose from 'mongoose';
import { Game } from './game.interface';

export const GameSchema = new mongoose.Schema<Game>(
  {
    category: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    defender: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    results: [{ set: { type: String } }],
  },
  { timestamps: true, collection: 'games' },
);
