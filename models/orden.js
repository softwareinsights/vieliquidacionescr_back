const connection = require('../config/db-connection');

const Orden = {};

Orden.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT orden.*, _vehiculoreparando_idvehiculoreparando.motivo as vehiculoreparando_vehiculoreparando_idvehiculoreparando FROM orden INNER JOIN vehiculoreparando as _vehiculoreparando_idvehiculoreparando ON _vehiculoreparando_idvehiculoreparando.idvehiculoreparando = orden.vehiculoreparando_idvehiculoreparando   WHERE created_by = ? HAVING orden.baja IS NULL OR orden.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT orden.*, _vehiculoreparando_idvehiculoreparando.motivo as vehiculoreparando_vehiculoreparando_idvehiculoreparando FROM orden INNER JOIN vehiculoreparando as _vehiculoreparando_idvehiculoreparando ON _vehiculoreparando_idvehiculoreparando.idvehiculoreparando = orden.vehiculoreparando_idvehiculoreparando   HAVING orden.baja IS NULL OR orden.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden leíd@' });
    });
};

Orden.findById = (idOrden, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM orden WHERE idorden = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrden, created_by];
    } else {
        query = 'SELECT * FROM orden WHERE idorden = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden encontrad@' });
    });
};

Orden.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idorden) AS count FROM orden';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden contabilizad@' });
    });
};

Orden.exist = (idOrden, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM orden WHERE idorden = ?) AS exist';
    keys = [idOrden];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden verificad@' });
    });
};

Orden.insert = (Orden, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO orden SET ?';
    keys = [Orden];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Orden cread@' });
    });
};

Orden.update = (Orden, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden SET ? WHERE idorden = ? AND created_by = ?';
        keys = [Orden, Orden.idorden, created_by];
    } else {
        query = 'UPDATE orden SET ? WHERE idorden = ?';
        keys = [Orden, Orden.idorden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden actualizad@' });
    });
};

Orden.remove = (idorden, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM orden WHERE idorden = ? AND created_by = ?';
        keys = [idorden, created_by];
    } else {
        query = 'DELETE FROM orden WHERE idorden = ?';
        keys = [idorden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden eliminad@' });
    });
};

Orden.logicRemove = (idorden, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden SET baja = 1 WHERE idorden = ? AND created_by = ?';
        keys = [idorden, created_by];
    } else {
        query = 'UPDATE orden SET baja = 1 WHERE idorden = ?';
        keys = [idorden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden eliminad@' });
    });
};

Orden.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orden;
