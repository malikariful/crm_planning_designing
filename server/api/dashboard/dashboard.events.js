/**
 * Dashboard model events
 */

'use strict';

import {EventEmitter} from 'events';
var Dashboard = require('../../sqldb').Dashboard;
var DashboardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DashboardEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Dashboard.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DashboardEvents.emit(event + ':' + doc._id, doc);
    DashboardEvents.emit(event, doc);
    done(null);
  };
}

export default DashboardEvents;
