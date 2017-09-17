'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './recommendations.events';

var RecommendationsSchema = new mongoose.Schema({
  projectTitle: String, //from hired
  recommendedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  recommendedRtaings: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  recommendDescription: String,
  recommendedDate: Date
});

registerEvents(RecommendationsSchema);
export default mongoose.model('recommendations', RecommendationsSchema);

