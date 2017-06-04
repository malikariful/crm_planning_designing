/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/jobs              ->  index
 * POST    /api/jobs              ->  create
 * GET     /api/jobs/:id          ->  show
 * PUT     /api/jobs/:id          ->  upsert
 * PATCH   /api/jobs/:id          ->  patch
 * DELETE  /api/jobs/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import sqldb from '../../sqldb';
import {Job} from '../../sqldb';
import {Vehicle} from '../../sqldb';
import {Employee} from '../../sqldb';
import {Problem} from '../../sqldb';
import {Designation} from '../../sqldb';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200; //response handler #2
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity); //request #3
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

// Gets a list of Jobs
export function index(req, res) {


    return Job.findAll({
        include: [
            {
                model: Vehicle
            }
        ]
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Job from the DB
export function show(req, res) {
    return Job.find({
        include: [{
            model: Problem,
            through: {
                where: {JobId: req.params.id}
            }
        }, {
            model: Employee,
            include: [{model: Designation}],
            through: {
                attributes: ['employee_name'],
                where: {JobId: req.params.id},
            }
        }, {
            model: Vehicle
        }],
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Job in the DB
// export function create(req, res) {
//     var employeeId;
//     if (req.body.employeeId) {
//         employeeId = req.body.employeeId;
//         delete req.body.employeeId;
//     }
//
//     return Job.create(req.body) //request #1
//         .then(function (responseInsert) {
//             var jobId = responseInsert._id; //response handler #1
//             console.log(jobId);
//             return sqldb.sequelize.query('INSERT INTO jobEmployeeMappingTable(JobId, EmployeeId) VALUES (jobId, employeeId)'); //request #2
//         })
//         .then(respondWithResult(res, 201))
//         .catch(handleError(res));
//
// }
export function create(req, res) {
    var employeeId;
    var problemId;
    if (req.body.employeeId) {
        employeeId = req.body.employeeId;
        problemId = req.body.problemId;
        delete req.body.employeeId;
        delete req.body.problemId;
    }


    return sqldb.sequelize.transaction(function (t) {

        return Job.create(req.body, {transaction: t}) // request #1

            .then(function (job) {

                sqldb.sequelize.query('INSERT INTO `jobEmployeeMappingTable` (`JobId`, `EmployeeId`) VALUES (:jobId, :empId)',
                    {
                        replacements: {jobId: parseInt(job._id), empId: parseInt(employeeId)},
                        type: sqldb.sequelize.QueryTypes.INSERT
                    });
                
                sqldb.sequelize.query('INSERT INTO `jobProblemMappingTable` (`JobId`, `ProblemId`) VALUES (:jobId, :problemId)',
                    {
                        replacements: {jobId: parseInt(job._id), problemId: parseInt(problemId)},
                        type: sqldb.sequelize.QueryTypes.INSERT
                    });

                return job;

            });

    })
        .then(respondWithResult(res))
        .catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        });


}

// Upserts the given Job in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    return Job.upsert(req.body, {
        where: {
            _id: req.params.id
        }
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Job in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Job.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Job from the DB
export function destroy(req, res) {
    return Job.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function jobEmployee(req, res) {
    let jobId = req.params.id;

    sqldb.sequelize.query('SELECT EmployeeId FROM `jobEmployeeMappingTable` WHERE JobId = :jobId',
    {
        replacements: {jobId: parseInt(jobId)},
        type: sqldb.sequelize.QueryTypes.SELECT
    }).then(function (queryResult) {

        var employeeIds = queryResult.map(function (currentValue, index) {

            return currentValue.EmployeeId;
        });

        return Employee.findAll({
            include: [
                {
                    model: Designation
                }
            ],
            where: {
                _id: employeeIds
            }
        })
            .then(respondWithResult(res))
            .catch(handleError(res));
    });

}

export function jobProblem(req, res) {
    let jobId = req.params.id;

    sqldb.sequelize.query('SELECT * FROM `jobProblemMappingTable` WHERE JobId = :jobId',
        {
            replacements: {jobId: parseInt(jobId)},
            type: sqldb.sequelize.QueryTypes.SELECT
        }).then(function (jobProblemMappingTableData) {
        console.log(jobProblemMappingTableData);
    });
}

// [ { EmployeeId: 6 }, { EmployeeId: 9 } ]
