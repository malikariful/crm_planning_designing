/**
 * Sale model events
 */

'use strict';

import {EventEmitter} from 'events';
var Sale = require('../../sqldb').Sale;
var SaleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SaleEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Sale) {
  for(var e in events) {
    let event = events[e];
    Sale.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    SaleEvents.emit(event + ':' + doc._id, doc);
    SaleEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Sale);
export default SaleEvents;
