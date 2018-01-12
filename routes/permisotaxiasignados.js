const router = require('express').Router();
const Permisotaxiasignado = require('../models/permisotaxiasignado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.all(created_by, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxiasignado.count((error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxiasignado.exist(req.params.id, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.findById(req.params.id, created_by, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.logicRemove(req.params.id, created_by, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxiasignado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.update(_permisotaxiasignado, created_by, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxiasignado = req.body;
                    _permisotaxiasignado.created_by = auth_data.user.idsi_user;
                    Permisotaxiasignado.insert( _permisotaxiasignado, (error, data) =>{
                        return Permisotaxiasignado.response(res, error, data);
                    });
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
