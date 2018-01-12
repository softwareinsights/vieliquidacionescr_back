const router = require('express').Router();
const Si_permiso = require('../models/si_permiso');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_permiso.all(created_by, (error, data) => {
                        return Si_permiso.response(res, error, data);
                    })
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_permiso.count((error, data) => {
                        return Si_permiso.response(res, error, data);
                    })
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_permiso.exist(req.params.id, (error, data) => {
                        return Si_permiso.response(res, error, data);
                    })
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_permiso.findById(req.params.id, created_by, (error, data) => {
                        return Si_permiso.response(res, error, data);
                    })
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_permiso.logicRemove(req.params.id, created_by, (error, data) => {
                        return Si_permiso.response(res, error, data);
                    })
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _si_permiso = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_permiso.update(_si_permiso, created_by, (error, data) => {
                        return Si_permiso.response(res, error, data);
                    })
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_permiso', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _si_permiso = req.body;
                    _si_permiso.created_by = auth_data.user.idsi_user;
                    Si_permiso.insert( _si_permiso, (error, data) =>{
                        return Si_permiso.response(res, error, data);
                    });
                } else {
                    return Si_permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
