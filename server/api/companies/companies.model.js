'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './companies.events';

var CompaniesSchema = new mongoose.Schema({
  name: String,
  headquarters: String,
  industry: String,
  website: String,
  about: String,
  logo: String,
  followersCount: Number,
  rfpsCount : Number
});

registerEvents(CompaniesSchema);
export default mongoose.model('Companies', CompaniesSchema);

