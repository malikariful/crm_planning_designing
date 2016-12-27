/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/permissions              ->  index
 * POST    /api/permissions              ->  create
 * GET     /api/permissions/:id          ->  show
 * PUT     /api/permissions/:id          ->  upsert
 * PATCH   /api/permissions/:id          ->  patch
 * DELETE  /api/permissions/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Permission} from '../../sqldb';

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

// Gets a list of Permissions
export function index(req, res) {
  return Permission.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Permission from the DB
export function show(req, res) {
  return Permission.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Permission in the DB
export function create(req, res) {
  return Permission.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Permission in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Permission.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Permission in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Permission.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Permission from the DB
export function destroy(req, res) {
  return Permission.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
