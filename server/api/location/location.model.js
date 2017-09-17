'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './location.events';

var LocationSchema = new mongoose.Schema({
  name: String,
});

registerEvents(LocationSchema);
export default mongoose.model('Location', LocationSchema);
