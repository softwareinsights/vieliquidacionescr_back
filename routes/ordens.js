const router = require('express').Router();
const Orden = require('../models/orden');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.all(created_by, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden.count((error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden.exist(req.params.id, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.findById(req.params.id, created_by, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.logicRemove(req.params.id, created_by, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _orden = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.update(_orden, created_by, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _orden = req.body;
                    _orden.created_by = auth_data.user.idsi_user;
                    Orden.insert( _orden, (error, data) =>{
                        return Orden.response(res, error, data);
                    });
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
