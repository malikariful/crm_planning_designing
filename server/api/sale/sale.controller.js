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
            let SaleId = sale.dataValues._id;
            let payable_money = req.body.EmiDetails.payable_money;
            let date_of_the_payment = req.body.EmiDetails.date_of_the_payment;
            let interest_rate = req.body.EmiDetails.interest_rate;

            req.body.SalesDetails.SaleId = sale.dataValues._id;
            req.body.SalesDetails.VehicleMasterId = vehicleId;


            sqldb.sequelize.query('INSERT INTO `EmiDetails` (`SaleId`,`payable_money`, `date_of_the_payment`, `interest_rate`) VALUES (:SaleId, :payable_money, :date_of_the_payment, :interest_rate)',
                {
                    replacements: {SaleId: SaleId, payable_money: payable_money, date_of_the_payment: date_of_the_payment,interest_rate: interest_rate},
                    type: sqldb.sequelize.QueryTypes.INSERT
                });


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
