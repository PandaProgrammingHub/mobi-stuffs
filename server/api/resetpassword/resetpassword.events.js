/**
 * Resetpassword model events
 */

'use strict';

import {EventEmitter} from 'events';
var ResetpasswordEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ResetpasswordEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Resetpassword) {
  for(var e in events) {
    let event = events[e];
    Resetpassword.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ResetpasswordEvents.emit(event + ':' + doc._id, doc);
    ResetpasswordEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ResetpasswordEvents;
