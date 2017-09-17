/**
 * Review model events
 */

'use strict';

import {EventEmitter} from 'events';
var ReviewEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReviewEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Review) {
  for(var e in events) {
    let event = events[e];
    Review.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ReviewEvents.emit(event + ':' + doc._id, doc);
    ReviewEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ReviewEvents;
