/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dealers              ->  index
 * POST    /api/dealers              ->  create
 * GET     /api/dealers/:id          ->  show
 * PUT     /api/dealers/:id          ->  upsert
 * PATCH   /api/dealers/:id          ->  patch
 * DELETE  /api/dealers/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Dealer} from '../../sqldb';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity && entity != entity instanceof Array) {
            return res.status(statusCode).json(entity);
        } else if(entity instanceof Array){
            var entityConverted = entity.reduce(function(acc, cur, i) {
                acc[i] = cur;
                return acc;
            }, {});
            
            return res.status(statusCode).json(entityConverted);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function (entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.destroy()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Dealers
export function index(req, res) {
    return Dealer.findAll()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Dealer from the DB
export function show(req, res) {
    return Dealer.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Dealer in the DB
export function create(req, res) {
    return Dealer.create(req.body.data)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Dealer in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    return Dealer.update(req.body, {
        where: {
            _id: req.params.id
        }
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Dealer in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Dealer.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Dealer from the DB
export function destroy(req, res) {
    return Dealer.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
