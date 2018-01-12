const router = require('express').Router();
const Boni_has_liqui = require('../models/boni_has_liqui');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Boni_has_liqui.all(created_by, (error, data) => {
                        return Boni_has_liqui.response(res, error, data);
                    })
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Boni_has_liqui.count((error, data) => {
                        return Boni_has_liqui.response(res, error, data);
                    })
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Boni_has_liqui.exist(req.params.id, (error, data) => {
                        return Boni_has_liqui.response(res, error, data);
                    })
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Boni_has_liqui.findById(req.params.id, created_by, (error, data) => {
                        return Boni_has_liqui.response(res, error, data);
                    })
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Boni_has_liqui.logicRemove(req.params.id, created_by, (error, data) => {
                        return Boni_has_liqui.response(res, error, data);
                    })
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _boni_has_liqui = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Boni_has_liqui.update(_boni_has_liqui, created_by, (error, data) => {
                        return Boni_has_liqui.response(res, error, data);
                    })
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'boni_has_liqui', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _boni_has_liqui = req.body;
                    _boni_has_liqui.created_by = auth_data.user.idsi_user;
                    Boni_has_liqui.insert( _boni_has_liqui, (error, data) =>{
                        return Boni_has_liqui.response(res, error, data);
                    });
                } else {
                    return Boni_has_liqui.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
