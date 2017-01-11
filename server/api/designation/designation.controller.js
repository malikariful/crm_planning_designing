/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/designations              ->  index
 * POST    /api/designations              ->  create
 * GET     /api/designations/:id          ->  show
 * PUT     /api/designations/:id          ->  upsert
 * PATCH   /api/designations/:id          ->  patch
 * DELETE  /api/designations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Designation} from '../../sqldb';

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

// Gets a list of Designations
export function index(req, res) {
  return Designation.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Designation from the DB
export function show(req, res) {
  return Designation.find({
    where: {
      designation_id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Designation in the DB
export function create(req, res) {
  return Designation.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Designation in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body.designation_id;
  }

  return Designation.upsert(req.body, {
    where: {
      designation_id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Designation in the DB
export function patch(req, res) {
  if(req.body.designation_id) {
    delete req.body.designation_id;
  }
  return Designation.find({
    where: {
      designation_id: req.params.designation_id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Designation from the DB
export function destroy(req, res) {
  return Designation.find({
    where: {
      designation_id: req.params.designation_id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
