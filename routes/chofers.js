const router = require('express').Router();
const Chofer = require('../models/chofer');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.all(created_by, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Chofer.count((error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Chofer.exist(req.params.id, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findById(req.params.id, created_by, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.logicRemove(req.params.id, created_by, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _chofer = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.update(_chofer, created_by, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _chofer = req.body;
                    _chofer.created_by = auth_data.user.idsi_user;
                    Chofer.insert( _chofer, (error, data) =>{
                        return Chofer.response(res, error, data);
                    });
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
