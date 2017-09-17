/**
 * Companies model events
 */

'use strict';

import {EventEmitter} from 'events';
var CompaniesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompaniesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Companies) {
  for(var e in events) {
    let event = events[e];
    Companies.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    CompaniesEvents.emit(event + ':' + doc._id, doc);
    CompaniesEvents.emit(event, doc);
  };
}

export {registerEvents};
export default CompaniesEvents;
