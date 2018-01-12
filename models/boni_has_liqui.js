const connection = require('../config/db-connection');

const Boni_has_liqui = {};

Boni_has_liqui.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT boni_has_liqui.*, _bonificacion_idbonificacion. as bonificacion_bonificacion_idbonificacion , _liquidacion_idliquidacion. as liquidacion_liquidacion_idliquidacion FROM boni_has_liqui INNER JOIN bonificacion as _bonificacion_idbonificacion ON _bonificacion_idbonificacion.idbonificacion = boni_has_liqui.bonificacion_idbonificacion INNER JOIN liquidacion as _liquidacion_idliquidacion ON _liquidacion_idliquidacion.idliquidacion = boni_has_liqui.liquidacion_idliquidacion   WHERE created_by = ? HAVING boni_has_liqui.baja IS NULL OR boni_has_liqui.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT boni_has_liqui.*, _bonificacion_idbonificacion. as bonificacion_bonificacion_idbonificacion , _liquidacion_idliquidacion. as liquidacion_liquidacion_idliquidacion FROM boni_has_liqui INNER JOIN bonificacion as _bonificacion_idbonificacion ON _bonificacion_idbonificacion.idbonificacion = boni_has_liqui.bonificacion_idbonificacion INNER JOIN liquidacion as _liquidacion_idliquidacion ON _liquidacion_idliquidacion.idliquidacion = boni_has_liqui.liquidacion_idliquidacion   HAVING boni_has_liqui.baja IS NULL OR boni_has_liqui.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui leíd@' });
    });
};

Boni_has_liqui.findById = (idBoni_has_liqui, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM boni_has_liqui WHERE idboni_has_liqui = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idBoni_has_liqui, created_by];
    } else {
        query = 'SELECT * FROM boni_has_liqui WHERE idboni_has_liqui = ? HAVING baja IS NULL OR baja = false';
        keys = [idBoni_has_liqui];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui encontrad@' });
    });
};

Boni_has_liqui.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idboni_has_liqui) AS count FROM boni_has_liqui';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui contabilizad@' });
    });
};

Boni_has_liqui.exist = (idBoni_has_liqui, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM boni_has_liqui WHERE idboni_has_liqui = ?) AS exist';
    keys = [idBoni_has_liqui];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui verificad@' });
    });
};

Boni_has_liqui.insert = (Boni_has_liqui, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO boni_has_liqui SET ?';
    keys = [Boni_has_liqui];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui cread@' });
    });
};

Boni_has_liqui.update = (Boni_has_liqui, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE boni_has_liqui SET ? WHERE idboni_has_liqui = ? AND created_by = ?';
        keys = [Boni_has_liqui, Boni_has_liqui.idboni_has_liqui, created_by];
    } else {
        query = 'UPDATE boni_has_liqui SET ? WHERE idboni_has_liqui = ?';
        keys = [Boni_has_liqui, Boni_has_liqui.idboni_has_liqui];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui actualizad@' });
    });
};

Boni_has_liqui.remove = (idboni_has_liqui, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM boni_has_liqui WHERE idboni_has_liqui = ? AND created_by = ?';
        keys = [idboni_has_liqui, created_by];
    } else {
        query = 'DELETE FROM boni_has_liqui WHERE idboni_has_liqui = ?';
        keys = [idboni_has_liqui];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui eliminad@' });
    });
};

Boni_has_liqui.logicRemove = (idboni_has_liqui, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE boni_has_liqui SET baja = 1 WHERE idboni_has_liqui = ? AND created_by = ?';
        keys = [idboni_has_liqui, created_by];
    } else {
        query = 'UPDATE boni_has_liqui SET baja = 1 WHERE idboni_has_liqui = ?';
        keys = [idboni_has_liqui];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Boni_has_liqui eliminad@' });
    });
};

Boni_has_liqui.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Boni_has_liqui;
