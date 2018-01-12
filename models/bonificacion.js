const connection = require('../config/db-connection');

const Bonificacion = {};

Bonificacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT bonificacion.*, _persona.nombre as chofer_chofer_idchofer FROM bonificacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = bonificacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE created_by = ? HAVING bonificacion.baja IS NULL OR bonificacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT bonificacion.*, _persona.nombre as chofer_chofer_idchofer FROM bonificacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = bonificacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING bonificacion.baja IS NULL OR bonificacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion leíd@' });
    });
};

Bonificacion.findById = (idBonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM bonificacion WHERE idbonificacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idBonificacion, created_by];
    } else {
        query = 'SELECT * FROM bonificacion WHERE idbonificacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idBonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion encontrad@' });
    });
};

Bonificacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idbonificacion) AS count FROM bonificacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion contabilizad@' });
    });
};

Bonificacion.exist = (idBonificacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM bonificacion WHERE idbonificacion = ?) AS exist';
    keys = [idBonificacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion verificad@' });
    });
};

Bonificacion.insert = (Bonificacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO bonificacion SET ?';
    keys = [Bonificacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion cread@' });
    });
};

Bonificacion.update = (Bonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE bonificacion SET ? WHERE idbonificacion = ? AND created_by = ?';
        keys = [Bonificacion, Bonificacion.idbonificacion, created_by];
    } else {
        query = 'UPDATE bonificacion SET ? WHERE idbonificacion = ?';
        keys = [Bonificacion, Bonificacion.idbonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion actualizad@' });
    });
};

Bonificacion.remove = (idbonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM bonificacion WHERE idbonificacion = ? AND created_by = ?';
        keys = [idbonificacion, created_by];
    } else {
        query = 'DELETE FROM bonificacion WHERE idbonificacion = ?';
        keys = [idbonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion eliminad@' });
    });
};

Bonificacion.logicRemove = (idbonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE bonificacion SET baja = 1 WHERE idbonificacion = ? AND created_by = ?';
        keys = [idbonificacion, created_by];
    } else {
        query = 'UPDATE bonificacion SET baja = 1 WHERE idbonificacion = ?';
        keys = [idbonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Bonificacion eliminad@' });
    });
};

Bonificacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Bonificacion;
