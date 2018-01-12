const router = require('express').Router();
const Taller = require('../models/taller');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.all(created_by, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Taller.count((error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Taller.exist(req.params.id, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.findById(req.params.id, created_by, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.logicRemove(req.params.id, created_by, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _taller = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.update(_taller, created_by, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _taller = req.body;
                    _taller.created_by = auth_data.user.idsi_user;
                    Taller.insert( _taller, (error, data) =>{
                        return Taller.response(res, error, data);
                    });
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
