const router = require('express').Router();
const Enviotaller = require('../models/enviotaller');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Enviotaller.all(created_by, (error, data) => {
                        return Enviotaller.response(res, error, data);
                    })
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Enviotaller.count((error, data) => {
                        return Enviotaller.response(res, error, data);
                    })
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Enviotaller.exist(req.params.id, (error, data) => {
                        return Enviotaller.response(res, error, data);
                    })
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Enviotaller.findById(req.params.id, created_by, (error, data) => {
                        return Enviotaller.response(res, error, data);
                    })
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Enviotaller.logicRemove(req.params.id, created_by, (error, data) => {
                        return Enviotaller.response(res, error, data);
                    })
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _enviotaller = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Enviotaller.update(_enviotaller, created_by, (error, data) => {
                        return Enviotaller.response(res, error, data);
                    })
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'enviotaller', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _enviotaller = req.body;
                    _enviotaller.created_by = auth_data.user.idsi_user;
                    Enviotaller.insert( _enviotaller, (error, data) =>{
                        return Enviotaller.response(res, error, data);
                    });
                } else {
                    return Enviotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
