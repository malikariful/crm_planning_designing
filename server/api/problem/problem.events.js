/**
 * Problem model events
 */

'use strict';

import {EventEmitter} from 'events';
var Problem = require('../../sqldb').Problem;
var ProblemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProblemEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Problem.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ProblemEvents.emit(event + ':' + doc._id, doc);
    ProblemEvents.emit(event, doc);
    done(null);
  };
}

export default ProblemEvents;
