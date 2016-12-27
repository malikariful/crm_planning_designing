/**
 * Model model events
 */

'use strict';

import {EventEmitter} from 'events';
var Model = require('../../sqldb').Model;
var ModelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ModelEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Model.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ModelEvents.emit(event + ':' + doc._id, doc);
    ModelEvents.emit(event, doc);
    done(null);
  };
}

export default ModelEvents;
