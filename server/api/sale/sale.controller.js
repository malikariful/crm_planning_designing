/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sales              ->  index
 * POST    /api/sales              ->  create
 * GET     /api/sales/:id          ->  show
 * PUT     /api/sales/:id          ->  upsert
 * PATCH   /api/sales/:id          ->  patch
 * DELETE  /api/sales/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import sqldb from '../../sqldb';
import {Sale} from '../../sqldb';
import {Customer} from '../../sqldb';
import {Employee} from '../../sqldb';
import {Designation} from '../../sqldb';
import {Area} from '../../sqldb';
import {SalesDetails} from '../../sqldb';
import {Vehicle} from '../../sqldb';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity && entity != entity instanceof Array) {
            return res.status(statusCode).json(entity);
        } else if (entity instanceof Array) {
            var entityConverted = entity.reduce(function (acc, cur, i) {
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

// Gets a list of Sales
export function index(req, res) {
    return Sale.findAll({
        include: [
            {
                model: Employee,
                include: [
                    {
                        model: Designation
                    }
                ]
            },
            {
                model: Customer
            }
        ]
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Sale from the DB
export function show(req, res) {
    return SalesDetails.find({
        where: {
            SaleId: req.params.id
        },
        include: [{
            model: Vehicle
        }]
    })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Sale in the DB
export function create(req, res) {
    var vehicleId;
    var customerId;
    // console.log(req.body.Vehicle);
    return sqldb.sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return Vehicle.create(req.body.Vehicle, {transaction: t})
            .then(function (vehicle) {
                vehicleId = vehicle.dataValues._id;
                return Customer.create(req.body.Customer, {transaction: t});
            }).then(function (customer) {
                customerId = customer.dataValues._id

            });

    }).then(function (result) {
        return Sale.create({
            "description": req.body.description,
            "EmployeeId": req.body.EmployeeId,
            "CustomerId": customerId
        });
    })
        .then(function (sale) {
            req.body.SalesDetails.SaleId = sale.dataValues._id;
            req.body.SalesDetails.VehicleMasterId = vehicleId;

            console.log(req.body.SalesDetails);

            return SalesDetails.create(req.body.SalesDetails);
        })
        .then(respondWithResult(res, 201))
        .catch(function (err) {
            console.log('err');
            console.log(err);
        });
}

// Upserts the given Sale in the DB at the specified ID

export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    return Sale.update(req.body, {
        where: {
            _id: req.params.id
        }
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Sale in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Sale.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Sale from the DB
export function destroy(req, res) {
    return Sale.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
//
// return SalesDetails.create({
//     "price": req.body.SalesDetails.price,
//     "free_service_number": req.body.SalesDetails.free_service_number,
//     "is_company": req.body.SalesDetails.is_company,
//     "internal_note": req.body.SalesDetails.internal_note,
//     "discount": req.body.SalesDetails.discount,
//     "degree_of_trust": req.body.SalesDetails.degree_of_trust,
//     "internal_reference": req.body.SalesDetails.internal_reference,
//     "payment_method": req.body.SalesDetails.payment_method,
//     "account_receivable": req.body.SalesDetails.account_receivable,
//     "account_payable": req.body.SalesDetails.account_payable,
//     "tax": req.body.SalesDetails.tax,
//     "saleId": saleId,
//     "VehicleMasterId": vehicleId
// });