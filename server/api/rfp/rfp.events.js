/**
 * Rfp model events
 */

'use strict';

import {EventEmitter} from 'events';
var RfpEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RfpEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Rfp) {
  for(var e in events) {
    let event = events[e];
    Rfp.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    RfpEvents.emit(event + ':' + doc._id, doc);
    RfpEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RfpEvents;
