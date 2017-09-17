'use strict';

import mongoose from 'mongoose';

var NotificationSchema = new mongoose.Schema({
  recepients: [String],
  message: String,
  viewed: [String]
});

export default mongoose.model('Notification', NotificationSchema);
