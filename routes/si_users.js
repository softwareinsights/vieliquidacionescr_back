const router = require('express').Router();
const Si_user = require('../models/si_user');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/login', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        Si_user.login( email, password, ( error, data ) => {
            return Si_user.response( res, error, data );
        });
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_user.all(created_by, (error, data) => {
                        return Si_user.response(res, error, data);
                    })
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_user.count((error, data) => {
                        return Si_user.response(res, error, data);
                    })
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_user.exist(req.params.id, (error, data) => {
                        return Si_user.response(res, error, data);
                    })
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_user.findById(req.params.id, created_by, (error, data) => {
                        return Si_user.response(res, error, data);
                    })
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_user.remove(req.params.id, created_by, (error, data) => {
                        return Si_user.response(res, error, data);
                    })
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _si_user = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_user.update(_si_user, created_by, (error, data) => {
                        return Si_user.response(res, error, data);
                    })
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'si_user', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _si_user = req.body;
                    _si_user.created_by = auth_data.user.idsi_user;
                    Si_user.insert( _si_user, (error, data) =>{
                        return Si_user.response(res, error, data);
                    });
                } else {
                    return Si_user.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
