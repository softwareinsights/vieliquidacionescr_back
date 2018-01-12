const connection = require('../config/db-connection');

const Orden_has_refaccion = {};

Orden_has_refaccion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden. as orden_orden_idorden , _refaccion_idrefaccion. as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   WHERE created_by = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden. as orden_orden_idorden , _refaccion_idrefaccion. as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion leíd@' });
    });
};

Orden_has_refaccion.findById = (idOrden_has_refaccion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM orden_has_refaccion WHERE idorden_has_refaccion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrden_has_refaccion, created_by];
    } else {
        query = 'SELECT * FROM orden_has_refaccion WHERE idorden_has_refaccion = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion encontrad@' });
    });
};

Orden_has_refaccion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idorden_has_refaccion) AS count FROM orden_has_refaccion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion contabilizad@' });
    });
};

Orden_has_refaccion.exist = (idOrden_has_refaccion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM orden_has_refaccion WHERE idorden_has_refaccion = ?) AS exist';
    keys = [idOrden_has_refaccion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion verificad@' });
    });
};

Orden_has_refaccion.insert = (Orden_has_refaccion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO orden_has_refaccion SET ?';
    keys = [Orden_has_refaccion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion cread@' });
    });
};

Orden_has_refaccion.update = (Orden_has_refaccion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden_has_refaccion SET ? WHERE idorden_has_refaccion = ? AND created_by = ?';
        keys = [Orden_has_refaccion, Orden_has_refaccion.idorden_has_refaccion, created_by];
    } else {
        query = 'UPDATE orden_has_refaccion SET ? WHERE idorden_has_refaccion = ?';
        keys = [Orden_has_refaccion, Orden_has_refaccion.idorden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion actualizad@' });
    });
};

Orden_has_refaccion.remove = (idorden_has_refaccion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM orden_has_refaccion WHERE idorden_has_refaccion = ? AND created_by = ?';
        keys = [idorden_has_refaccion, created_by];
    } else {
        query = 'DELETE FROM orden_has_refaccion WHERE idorden_has_refaccion = ?';
        keys = [idorden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion eliminad@' });
    });
};

Orden_has_refaccion.logicRemove = (idorden_has_refaccion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden_has_refaccion SET baja = 1 WHERE idorden_has_refaccion = ? AND created_by = ?';
        keys = [idorden_has_refaccion, created_by];
    } else {
        query = 'UPDATE orden_has_refaccion SET baja = 1 WHERE idorden_has_refaccion = ?';
        keys = [idorden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion eliminad@' });
    });
};

Orden_has_refaccion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orden_has_refaccion;
