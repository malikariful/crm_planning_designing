/**
 * Permission model events
 */

'use strict';

import {EventEmitter} from 'events';
var Permission = require('../../sqldb').Permission;
var PermissionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PermissionEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Permission.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PermissionEvents.emit(event + ':' + doc._id, doc);
    PermissionEvents.emit(event, doc);
    done(null);
  };
}

export default PermissionEvents;
