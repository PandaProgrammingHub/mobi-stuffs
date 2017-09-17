/**
 * Companies model events
 */

'use strict';

import {EventEmitter} from 'events';
var RecommendationsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RecommendationsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(recommendations) {
  for(var e in events) {
    let event = events[e];
    recommendations.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    RecommendationsEvents.emit(event + ':' + doc._id, doc);
    RecommendationsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RecommendationsEvents;
