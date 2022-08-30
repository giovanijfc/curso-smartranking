import * as mongoose from 'mongoose';
import { Challenge } from './challenge.interface';

export const ChallengeSchema = new mongoose.Schema<Challenge>(
  {
    responseDate: { type: Date },
    challengeDate: { type: Date },
    solicitationDate: { type: Date },
    status: { type: String },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  },
  { timestamps: true, collection: 'challenges' },
);
