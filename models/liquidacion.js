const connection = require('../config/db-connection');

const Liquidacion = {};

Liquidacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _persona.nombre as chofer_chofer_idchofer FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT liquidacion.*, _persona.nombre as chofer_chofer_idchofer FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion leíd@' });
    });
};

Liquidacion.findById = (idLiquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM liquidacion WHERE idliquidacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion, created_by];
    } else {
        query = 'SELECT * FROM liquidacion WHERE idliquidacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};

Liquidacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idliquidacion) AS count FROM liquidacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion contabilizad@' });
    });
};

Liquidacion.exist = (idLiquidacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM liquidacion WHERE idliquidacion = ?) AS exist';
    keys = [idLiquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion verificad@' });
    });
};

Liquidacion.insert = (Liquidacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO liquidacion SET ?';
    keys = [Liquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion cread@' });
    });
};

Liquidacion.update = (Liquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion SET ? WHERE idliquidacion = ? AND created_by = ?';
        keys = [Liquidacion, Liquidacion.idliquidacion, created_by];
    } else {
        query = 'UPDATE liquidacion SET ? WHERE idliquidacion = ?';
        keys = [Liquidacion, Liquidacion.idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion actualizad@' });
    });
};

Liquidacion.remove = (idliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM liquidacion WHERE idliquidacion = ? AND created_by = ?';
        keys = [idliquidacion, created_by];
    } else {
        query = 'DELETE FROM liquidacion WHERE idliquidacion = ?';
        keys = [idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion eliminad@' });
    });
};

Liquidacion.logicRemove = (idliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion SET baja = 1 WHERE idliquidacion = ? AND created_by = ?';
        keys = [idliquidacion, created_by];
    } else {
        query = 'UPDATE liquidacion SET baja = 1 WHERE idliquidacion = ?';
        keys = [idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion eliminad@' });
    });
};

Liquidacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Liquidacion;
