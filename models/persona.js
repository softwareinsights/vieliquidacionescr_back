const connection = require('../config/db-connection');

const Persona = {};

Persona.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT persona.* FROM persona    WHERE created_by = ? HAVING persona.baja IS NULL OR persona.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT persona.* FROM persona    HAVING persona.baja IS NULL OR persona.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Persona leíd@' });
    });
};

Persona.findById = (idPersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM persona WHERE idpersona = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT * FROM persona WHERE idpersona = ? HAVING baja IS NULL OR baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Persona encontrad@' });
    });
};

Persona.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpersona) AS count FROM persona';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Persona contabilizad@' });
    });
};

Persona.exist = (idPersona, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM persona WHERE idpersona = ?) AS exist';
    keys = [idPersona];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Persona verificad@' });
    });
};

Persona.insert = (Persona, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO persona SET ?';
    keys = [Persona];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Persona cread@' });
    });
};

Persona.update = (Persona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE persona SET ? WHERE idpersona = ? AND created_by = ?';
        keys = [Persona, Persona.idpersona, created_by];
    } else {
        query = 'UPDATE persona SET ? WHERE idpersona = ?';
        keys = [Persona, Persona.idpersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Persona actualizad@' });
    });
};

Persona.remove = (idpersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM persona WHERE idpersona = ? AND created_by = ?';
        keys = [idpersona, created_by];
    } else {
        query = 'DELETE FROM persona WHERE idpersona = ?';
        keys = [idpersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Persona eliminad@' });
    });
};

Persona.logicRemove = (idpersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE persona SET baja = 1 WHERE idpersona = ? AND created_by = ?';
        keys = [idpersona, created_by];
    } else {
        query = 'UPDATE persona SET baja = 1 WHERE idpersona = ?';
        keys = [idpersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Persona eliminad@' });
    });
};

Persona.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Persona;
