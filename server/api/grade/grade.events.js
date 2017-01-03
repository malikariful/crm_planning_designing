/**
 * Grade model events
 */

'use strict';

import {EventEmitter} from 'events';
var Grade = require('../../sqldb').Grade;
var GradeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GradeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Grade.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    GradeEvents.emit(event + ':' + doc._id, doc);
    GradeEvents.emit(event, doc);
    done(null);
  };
}

export default GradeEvents;
