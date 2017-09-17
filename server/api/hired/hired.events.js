/**
 * Hired model events
 */

'use strict';

import {EventEmitter} from 'events';
var HiredEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HiredEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Hired) {
  for(var e in events) {
    let event = events[e];
    Hired.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    HiredEvents.emit(event + ':' + doc._id, doc);
    HiredEvents.emit(event, doc);
  };
}

export {registerEvents};
export default HiredEvents;
