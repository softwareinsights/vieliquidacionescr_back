const router = require('express').Router();
const Folio = require('../models/folio');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Folio.all(created_by, (error, data) => {
                        return Folio.response(res, error, data);
                    })
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Folio.count((error, data) => {
                        return Folio.response(res, error, data);
                    })
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Folio.exist(req.params.id, (error, data) => {
                        return Folio.response(res, error, data);
                    })
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Folio.findById(req.params.id, created_by, (error, data) => {
                        return Folio.response(res, error, data);
                    })
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Folio.logicRemove(req.params.id, created_by, (error, data) => {
                        return Folio.response(res, error, data);
                    })
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _folio = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Folio.update(_folio, created_by, (error, data) => {
                        return Folio.response(res, error, data);
                    })
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'folio', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _folio = req.body;
                    _folio.created_by = auth_data.user.idsi_user;
                    Folio.insert( _folio, (error, data) =>{
                        return Folio.response(res, error, data);
                    });
                } else {
                    return Folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
