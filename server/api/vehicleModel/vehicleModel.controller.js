/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicleModels              ->  index
 * POST    /api/vehicleModels              ->  create
 * GET     /api/vehicleModels/:id          ->  show
 * PUT     /api/vehicleModels/:id          ->  upsert
 * PATCH   /api/vehicleModels/:id          ->  patch
 * DELETE  /api/vehicleModels/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {VehicleModel} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of VehicleModels
export function index(req, res) {
  return VehicleModel.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single VehicleModel from the DB
export function show(req, res) {
  return VehicleModel.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new VehicleModel in the DB
export function create(req, res) {
  return VehicleModel.create(req.body.data)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given VehicleModel in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return VehicleModel.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing VehicleModel in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return VehicleModel.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a VehicleModel from the DB
export function destroy(req, res) {
  return VehicleModel.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
