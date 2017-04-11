'use strict';

import jsonpatch from 'fast-json-patch';
import {User} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';


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

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        return res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        return res.status(statusCode).send(err);
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


/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
    return User.findAll({
        attributes: [
            '_id',
            'name',
            'firstName',
            'lastName',
            'email',
            'activate',
            'role',
            'createdAt',
            'updatedAt',
            'provider'
        ]
    })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
    var newUser = User.build(req.body);
    newUser.setDataValue('provider', 'local');
    // newUser.setDataValue('role', 'user');
    return newUser.save()
        .then(function (user) {
            var token = jwt.sign({_id: user._id}, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({token});
        })
        .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    return User.find({
        where: {
            _id: userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
    return User.destroy({where: {_id: req.params.id}})
        .then(function () {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Update a user
 * restriction: 'admin'
 */
export function patch(req, res) {
    // console.log('request****************************************************')
    // console.log(req);
    // console.log('response****************************************************')
    // console.log(res);

    if (req.body._id) {
        delete req.body._id;
    }
    return User.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));

}


/**
 * Change a users password
 */
export function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.find({
        where: {
            _id: userId
        }
    })
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.save()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;

    return User.find({
        where: {
            _id: userId
        },
        attributes: [
            '_id',
            'name',
            'firstName',
            'lastName',
            'email',
            'activate',
            'role',
            'provider'
        ]
    })
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
    res.redirect('/');
}
