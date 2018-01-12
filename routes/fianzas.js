const router = require('express').Router();
const Fianza = require('../models/fianza');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza.all(created_by, (error, data) => {
                        return Fianza.response(res, error, data);
                    })
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Fianza.count((error, data) => {
                        return Fianza.response(res, error, data);
                    })
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Fianza.exist(req.params.id, (error, data) => {
                        return Fianza.response(res, error, data);
                    })
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza.findById(req.params.id, created_by, (error, data) => {
                        return Fianza.response(res, error, data);
                    })
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza.logicRemove(req.params.id, created_by, (error, data) => {
                        return Fianza.response(res, error, data);
                    })
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _fianza = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza.update(_fianza, created_by, (error, data) => {
                        return Fianza.response(res, error, data);
                    })
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _fianza = req.body;
                    _fianza.created_by = auth_data.user.idsi_user;
                    Fianza.insert( _fianza, (error, data) =>{
                        return Fianza.response(res, error, data);
                    });
                } else {
                    return Fianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
