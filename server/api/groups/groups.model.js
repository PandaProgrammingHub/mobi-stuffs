'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './groups.events';

var GroupsSchema = new mongoose.Schema({
  name: String,
  members: Number
});

registerEvents(GroupsSchema);
export default mongoose.model('Groups', GroupsSchema);
