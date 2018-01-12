const router = require('express').Router();
const Bonificacion = require('../models/bonificacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.all(created_by, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Bonificacion.count((error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Bonificacion.exist(req.params.id, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.findById(req.params.id, created_by, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _bonificacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.update(_bonificacion, created_by, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _bonificacion = req.body;
                    _bonificacion.created_by = auth_data.user.idsi_user;
                    Bonificacion.insert( _bonificacion, (error, data) =>{
                        return Bonificacion.response(res, error, data);
                    });
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
