/**
 * Groups model events
 */

'use strict';

import {EventEmitter} from 'events';
var GroupsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GroupsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Groups) {
  for(var e in events) {
    let event = events[e];
    Groups.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    GroupsEvents.emit(event + ':' + doc._id, doc);
    GroupsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default GroupsEvents;
