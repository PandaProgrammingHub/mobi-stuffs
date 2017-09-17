'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './review.events';

var ReviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  reviewType: {
    type: String,
    enum: [
      'preSales',
      'postSales',
      'sales',
      'overall'
    ]
  },
  product: [String],
  location: [String],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  experience: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  describe: String,
  rateDifficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  rateNegotiationDifficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  decisionTime: {
    type: String,
    enum: ['Less than 1 week', '1-2 weeks', '2-4 weeks', '1-2 months', '2-4 months', 'More than 4 months', '']
  },
  departmentsInvolved: {
    type: [String],
    enum: ['Human Resource', 'Finance', 'IT', 'Marketing', 'Operations', '']
  },
  keyDecisionMakers: [String],
  successFactors: [String],
  changeManagement: [String],
  expectationManagement: [String],
  whatWasGood: String,
  whatCouldBeBetter: String,
  companyName: String,
  companyId: String,
  reviewDate: String,
  isAnonymous:Boolean,
  paymentTerms: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  companyResponse: {type: String, default: null},
  flag: {
    type: Number,
    default:1
  }
});

registerEvents(ReviewSchema);
export default mongoose.model('Review', ReviewSchema);
