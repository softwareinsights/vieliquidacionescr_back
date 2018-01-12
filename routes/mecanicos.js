const router = require('express').Router();
const Mecanico = require('../models/mecanico');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mecanico.all(created_by, (error, data) => {
                        return Mecanico.response(res, error, data);
                    })
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Mecanico.count((error, data) => {
                        return Mecanico.response(res, error, data);
                    })
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Mecanico.exist(req.params.id, (error, data) => {
                        return Mecanico.response(res, error, data);
                    })
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mecanico.findById(req.params.id, created_by, (error, data) => {
                        return Mecanico.response(res, error, data);
                    })
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mecanico.logicRemove(req.params.id, created_by, (error, data) => {
                        return Mecanico.response(res, error, data);
                    })
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _mecanico = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mecanico.update(_mecanico, created_by, (error, data) => {
                        return Mecanico.response(res, error, data);
                    })
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mecanico', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _mecanico = req.body;
                    _mecanico.created_by = auth_data.user.idsi_user;
                    Mecanico.insert( _mecanico, (error, data) =>{
                        return Mecanico.response(res, error, data);
                    });
                } else {
                    return Mecanico.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
