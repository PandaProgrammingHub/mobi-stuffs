'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './resetpassword.events';

var ResetpasswordSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ResetpasswordSchema);
export default mongoose.model('Resetpassword', ResetpasswordSchema);
