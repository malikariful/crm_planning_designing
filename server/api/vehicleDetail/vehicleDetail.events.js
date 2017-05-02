/**
 * VehicleDetail model events
 */

'use strict';

import {EventEmitter} from 'events';
var VehicleDetail = require('../../sqldb').VehicleDetail;
var VehicleDetailEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VehicleDetailEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(VehicleDetail) {
  for(var e in events) {
    let event = events[e];
    VehicleDetail.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    VehicleDetailEvents.emit(event + ':' + doc._id, doc);
    VehicleDetailEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(VehicleDetail);
export default VehicleDetailEvents;
