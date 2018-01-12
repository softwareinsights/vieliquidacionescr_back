const connection = require('../config/db-connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySecretPass = process.env.SECRET_PASSWORD;

const Si_user = {};
Si_user.insert = (user, next) => {
    if ( !connection )
        return next('Connection refused');
    // Hash password
    bcrypt.hash(user.password, saltRounds)
    .then( hash => {
        user.password = hash;

        // Insert into table
        connection.query('INSERT INTO si_user SET ?', [user], ( error, result ) => {
            if ( error ) {
                // WARNING: To take effect, user table must have the email field as unique column
                if (error.code === 'ER_DUP_ENTRY') {
                    return next( null, {
                        success: false,
                        error: error,
                        message: 'Este email ya esta en uso'
                    });
                } else
                    return next({ success: false, error: error });
            }

            return next( null, {
                success: true,
                result: result,
                message: '¡Registro exitoso!'
            });
        })
    })
    .catch( error => next({ success: false, error: error }) );
}

Si_user.login = ( email, password, next ) => {
    if ( !connection )
        return next('Connection refused');

    const query = connection.query(`SELECT idsi_user, usuario, email, password, Rol_idsi_rol, super, baja FROM si_user WHERE email = ? HAVING baja IS NULL OR baja = false`, [email], (error, result) => {

        if ( error )
            return next( error );
        if ( result[0] ) {
            const hash = result[0].password.toString();
            bcrypt.compare(password, hash, ( error, res ) => {
                if ( res ) {
                    const payload = {
                        idsi_user: result[0].idsi_user,
                        usuario: result[0].usuario,
                        email: result[0].email,
                        Rol_idsi_rol: result[0].Rol_idsi_rol
                    }
                    // Generate token
                    const token = jwt.sign(payload, mySecretPass, {
                        expiresIn: 60 * 60 * 24
                    });

                    let _super = result[0].super;
                    let _query = '';
                    
                    if (!_super) {
                        _query = `SELECT m.nombre, m.baja, p.writeable, p.deleteable, p.readable, p.updateable, p.write_own, p.delete_own, p.read_own, p.update_own
                                 FROM si_user as u 
                                 INNER JOIN si_rol as r ON r.idsi_rol = u.Rol_idsi_rol 
                                 INNER JOIN si_permiso as p ON p.Rol_idsi_rol = r.idsi_rol 
                                 INNER JOIN si_modulo as m ON m.idsi_modulo = p.Modulo_idsi_modulo 
                                 WHERE u.idsi_user = ? AND p.acceso = 1 HAVING m.baja IS NULL OR m.baja = false`;
                    } else {
                        _query = `SELECT m.nombre FROM si_modulo as m`;
                    }

                    const query = connection.query(_query, [result[0].idsi_user], (error, modules) => {

                        if ( error )
                            return next( error );
                        
                        return next( null, {
                            success: true,
                            message: 'Has iniciado sesión correctamente',
                            token: token,
                            modules: modules
                        });
                    });
                } else
                    return next(null, {
                        success: false,
                        message: 'Password incorrecto'
                    });
            });
        } else {
            return next(null, {
                success: false,
                message: 'El email y password no coinciden'
            })
        }
    });
}

Si_user.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT si_user.* FROM si_user WHERE created_by = ? HAVING si_user.baja IS NULL OR si_user.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT si_user.* FROM si_user HAVING si_user.baja IS NULL OR si_user.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user leíd@' });
    });
};

Si_user.findById = (idSi_user, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM si_user WHERE idsi_user = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_user, created_by];
    } else {
        query = 'SELECT * FROM si_user WHERE idsi_user = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user encontrad@' });
    });
};

Si_user.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsi_user) AS count FROM si_user';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_user contabilizad@' });
    });
};

Si_user.exist = (idSi_user, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM si_user WHERE idsi_user = ?) AS exist';
    keys = [idSi_user];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_user verificad@' });
    });
};

Si_user.update = (Si_user, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_user SET ? WHERE idsi_user = ? AND created_by = ?';
        keys = [Si_user, Si_user.idsi_user, created_by];
    } else {
        query = 'UPDATE si_user SET ? WHERE idsi_user = ?';
        keys = [Si_user, Si_user.idsi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible editar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user actualizad@' });
    });
};

Si_user.remove = (idsi_user, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM si_user WHERE idsi_user = ? AND created_by = ?';
        keys = [idsi_user, created_by];
    } else {
        query = 'DELETE FROM si_user WHERE idsi_user = ?';
        keys = [idsi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user eliminad@' });
    });
};

Si_user.logicRemove = (idsi_user, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_user SET baja = 1 WHERE idsi_user = ? AND created_by = ?';
        keys = [idsi_user, created_by];
    } else {
        query = 'UPDATE si_user SET baja = 1 WHERE idsi_user = ?';
        keys = [idsi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user eliminad@' });
    });
};

Si_user.response = (res, error, data) => {
    if (error)
        res.status(500).json(error);
    else
        res.status(200).json(data);
}

module.exports = Si_user;
