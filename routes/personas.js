const router = require('express').Router();
const Persona = require('../models/persona');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.all(created_by, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Persona.count((error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Persona.exist(req.params.id, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.findById(req.params.id, created_by, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.logicRemove(req.params.id, created_by, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _persona = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.update(_persona, created_by, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _persona = req.body;
                    _persona.created_by = auth_data.user.idsi_user;
                    Persona.insert( _persona, (error, data) =>{
                        return Persona.response(res, error, data);
                    });
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
