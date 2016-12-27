/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/models              ->  index
 * POST    /api/models              ->  create
 * GET     /api/models/:id          ->  show
 * PUT     /api/models/:id          ->  upsert
 * PATCH   /api/models/:id          ->  patch
 * DELETE  /api/models/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Model} from '../../sqldb';

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

// Gets a list of Models
export function index(req, res) {
  return Model.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Model from the DB
export function show(req, res) {
  return Model.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Model in the DB
export function create(req, res) {
  return Model.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Model in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Model.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Model in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Model.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Model from the DB
export function destroy(req, res) {
  return Model.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
