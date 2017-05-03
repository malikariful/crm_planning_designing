/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicleDetails              ->  index
 * POST    /api/vehicleDetails              ->  create
 * GET     /api/vehicleDetails/:id          ->  show
 * PUT     /api/vehicleDetails/:id          ->  upsert
 * PATCH   /api/vehicleDetails/:id          ->  patch
 * DELETE  /api/vehicleDetails/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {VehicleDetail} from '../../sqldb';
import {Dealer} from '../../sqldb';


function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
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

// Gets a list of VehicleDetails
export function index(req, res) {
    return VehicleDetail.findAll({
        include: [
            {
                model: Dealer
            }
        ]
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single VehicleDetail from the DB
export function show(req, res) {
    return VehicleDetail.find({
        where: {
            VehicleMasterId: req.params.id
        },
        include: [
            {
                model: Dealer,
                // where: { DealerId: 'abc' }
            }
        ]
    })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new VehicleDetail in the DB
export function create(req, res) {
    
    return VehicleDetail.create(req.body.data)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given VehicleDetail in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    return VehicleDetail.upsert(req.body, {
        where: {
            _id: req.params.id
        }
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing VehicleDetail in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return VehicleDetail.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a VehicleDetail from the DB
export function destroy(req, res) {
    return VehicleDetail.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

// Gets a list of Vehicles
// export function index(req, res) {
//     return Vehicle.findAll({
//         include: [
//             {
//                 model: VehicleModel
//             }, {
//                 model: VehicleDetails,
//                 include: [
//                     {
//                         model: Dealer
//                     }
//                 ]
//             }
//         ]
//     })
//         .then(respondWithResult(res))
//         .catch(handleError(res));
// }