const router = require('express').Router();
const Vehiculo = require('../models/vehiculo');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculo.all(created_by, (error, data) => {
                        return Vehiculo.response(res, error, data);
                    })
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculo.count((error, data) => {
                        return Vehiculo.response(res, error, data);
                    })
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculo.exist(req.params.id, (error, data) => {
                        return Vehiculo.response(res, error, data);
                    })
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculo.findById(req.params.id, created_by, (error, data) => {
                        return Vehiculo.response(res, error, data);
                    })
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculo.logicRemove(req.params.id, created_by, (error, data) => {
                        return Vehiculo.response(res, error, data);
                    })
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _vehiculo = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculo.update(_vehiculo, created_by, (error, data) => {
                        return Vehiculo.response(res, error, data);
                    })
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculo', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculo = req.body;
                    _vehiculo.created_by = auth_data.user.idsi_user;
                    Vehiculo.insert( _vehiculo, (error, data) =>{
                        return Vehiculo.response(res, error, data);
                    });
                } else {
                    return Vehiculo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
