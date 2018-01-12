const connection = require('../config/db-connection');

const Corralon = {};

Corralon.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corralon.*, _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado   WHERE created_by = ? HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT corralon.*, _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado   HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon leíd@' });
    });
};

Corralon.findById = (idCorralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM corralon WHERE idcorralon = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCorralon, created_by];
    } else {
        query = 'SELECT * FROM corralon WHERE idcorralon = ? HAVING baja IS NULL OR baja = false';
        keys = [idCorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon encontrad@' });
    });
};

Corralon.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcorralon) AS count FROM corralon';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Corralon contabilizad@' });
    });
};

Corralon.exist = (idCorralon, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM corralon WHERE idcorralon = ?) AS exist';
    keys = [idCorralon];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Corralon verificad@' });
    });
};

Corralon.insert = (Corralon, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO corralon SET ?';
    keys = [Corralon];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Corralon cread@' });
    });
};

Corralon.update = (Corralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE corralon SET ? WHERE idcorralon = ? AND created_by = ?';
        keys = [Corralon, Corralon.idcorralon, created_by];
    } else {
        query = 'UPDATE corralon SET ? WHERE idcorralon = ?';
        keys = [Corralon, Corralon.idcorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon actualizad@' });
    });
};

Corralon.remove = (idcorralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM corralon WHERE idcorralon = ? AND created_by = ?';
        keys = [idcorralon, created_by];
    } else {
        query = 'DELETE FROM corralon WHERE idcorralon = ?';
        keys = [idcorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon eliminad@' });
    });
};

Corralon.logicRemove = (idcorralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE corralon SET baja = 1 WHERE idcorralon = ? AND created_by = ?';
        keys = [idcorralon, created_by];
    } else {
        query = 'UPDATE corralon SET baja = 1 WHERE idcorralon = ?';
        keys = [idcorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon eliminad@' });
    });
};

Corralon.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Corralon;
