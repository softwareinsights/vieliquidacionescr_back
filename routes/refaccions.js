const router = require('express').Router();
const Refaccion = require('../models/refaccion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Refaccion.all(created_by, (error, data) => {
                        return Refaccion.response(res, error, data);
                    })
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Refaccion.count((error, data) => {
                        return Refaccion.response(res, error, data);
                    })
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Refaccion.exist(req.params.id, (error, data) => {
                        return Refaccion.response(res, error, data);
                    })
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Refaccion.findById(req.params.id, created_by, (error, data) => {
                        return Refaccion.response(res, error, data);
                    })
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Refaccion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Refaccion.response(res, error, data);
                    })
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _refaccion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Refaccion.update(_refaccion, created_by, (error, data) => {
                        return Refaccion.response(res, error, data);
                    })
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'refaccion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _refaccion = req.body;
                    _refaccion.created_by = auth_data.user.idsi_user;
                    Refaccion.insert( _refaccion, (error, data) =>{
                        return Refaccion.response(res, error, data);
                    });
                } else {
                    return Refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
