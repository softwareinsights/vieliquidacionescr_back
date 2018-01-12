const router = require('express').Router();
const Fianza_has_folio = require('../models/fianza_has_folio');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza_has_folio.all(created_by, (error, data) => {
                        return Fianza_has_folio.response(res, error, data);
                    })
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Fianza_has_folio.count((error, data) => {
                        return Fianza_has_folio.response(res, error, data);
                    })
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Fianza_has_folio.exist(req.params.id, (error, data) => {
                        return Fianza_has_folio.response(res, error, data);
                    })
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza_has_folio.findById(req.params.id, created_by, (error, data) => {
                        return Fianza_has_folio.response(res, error, data);
                    })
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza_has_folio.logicRemove(req.params.id, created_by, (error, data) => {
                        return Fianza_has_folio.response(res, error, data);
                    })
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _fianza_has_folio = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Fianza_has_folio.update(_fianza_has_folio, created_by, (error, data) => {
                        return Fianza_has_folio.response(res, error, data);
                    })
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'fianza_has_folio', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _fianza_has_folio = req.body;
                    _fianza_has_folio.created_by = auth_data.user.idsi_user;
                    Fianza_has_folio.insert( _fianza_has_folio, (error, data) =>{
                        return Fianza_has_folio.response(res, error, data);
                    });
                } else {
                    return Fianza_has_folio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
