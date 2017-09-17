'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './hired.events';

var HiredSchema = new mongoose.Schema({
  projectTitle: String,
  companyName: String,
  description: String,
  productCategories: [String],
  location: [String],
  endDate: Date,
  date: Date,
  budgetRangeStart: Number,
  budgetRangeEnd: Number,
  appliedBy: [
    {
      userId: String,
      userName: String
    }
  ],
  saleStage: {
    type: String,
    enum: [
      'Pre-Sales',
      'Sales',
      'Post-Sales'
    ]
  },
  closeApplied: Object,
  priority: {
    type: String,
    enum: [
      'low',
      'medium',
      'high'
    ]
  },
  postedBy: Object
});

registerEvents(HiredSchema);
export default mongoose.model('Hired', HiredSchema);
