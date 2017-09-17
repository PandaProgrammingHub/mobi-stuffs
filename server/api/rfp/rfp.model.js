'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './rfp.events';

var RfpSchema = new mongoose.Schema({
  rfpTitle: String,
  companyName: String,
  proposalDescription: String,
  productCategory: [String],
  additionalComments: String,
  endDate: Date,
  budgetStart: String,
  budgetEnd: String,
  appliedBy: [
    {
      userId: String,
      userName: String
    }
  ],
  location: [String],
  closeApplied: Object,
  docs: Buffer,
  interests: [
    {
      companyName: String,
      email: String,
      phoneNumber: String,
      location: [String],
      message: String,
      fromUser: Object
    }
  ],
  postedBy: Object,
  createdAt: String
});

registerEvents(RfpSchema);
export default mongoose.model('Rfp', RfpSchema);
