const router = require('express').Router();
const Egresoconcepto = require('../models/egresoconcepto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.all(created_by, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Egresoconcepto.count((error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Egresoconcepto.exist(req.params.id, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.findById(req.params.id, created_by, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.logicRemove(req.params.id, created_by, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _egresoconcepto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.update(_egresoconcepto, created_by, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _egresoconcepto = req.body;
                    _egresoconcepto.created_by = auth_data.user.idsi_user;
                    Egresoconcepto.insert( _egresoconcepto, (error, data) =>{
                        return Egresoconcepto.response(res, error, data);
                    });
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
