const router = require('express').Router();
const Si_reporte = require('../models/si_reporte');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_reporte.all(created_by, (error, data) => {
                        return Si_reporte.response(res, error, data);
                    })
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_reporte.count((error, data) => {
                        return Si_reporte.response(res, error, data);
                    })
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_reporte.exist(req.params.id, (error, data) => {
                        return Si_reporte.response(res, error, data);
                    })
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_reporte.findById(req.params.id, created_by, (error, data) => {
                        return Si_reporte.response(res, error, data);
                    })
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_reporte.logicRemove(req.params.id, created_by, (error, data) => {
                        return Si_reporte.response(res, error, data);
                    })
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _si_reporte = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_reporte.update(_si_reporte, created_by, (error, data) => {
                        return Si_reporte.response(res, error, data);
                    })
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_reporte', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _si_reporte = req.body;
                    _si_reporte.created_by = auth_data.user.idsi_user;
                    Si_reporte.insert( _si_reporte, (error, data) =>{
                        return Si_reporte.response(res, error, data);
                    });
                } else {
                    return Si_reporte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
