const connection = require('../config/db-connection');

const Enviotaller = {};

Enviotaller.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT enviotaller.*, _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado , _taller_idtaller.nombre as taller_taller_idtaller FROM enviotaller INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = enviotaller.permisotaxiasignado_idpermisotaxiasignado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = enviotaller.taller_idtaller INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE created_by = ? HAVING enviotaller.baja IS NULL OR enviotaller.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT enviotaller.*, _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado , _taller_idtaller.nombre as taller_taller_idtaller FROM enviotaller INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = enviotaller.permisotaxiasignado_idpermisotaxiasignado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = enviotaller.taller_idtaller INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  HAVING enviotaller.baja IS NULL OR enviotaller.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller leíd@' });
    });
};

Enviotaller.findById = (idEnviotaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM enviotaller WHERE idenviotaller = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEnviotaller, created_by];
    } else {
        query = 'SELECT * FROM enviotaller WHERE idenviotaller = ? HAVING baja IS NULL OR baja = false';
        keys = [idEnviotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller encontrad@' });
    });
};

Enviotaller.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idenviotaller) AS count FROM enviotaller';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller contabilizad@' });
    });
};

Enviotaller.exist = (idEnviotaller, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM enviotaller WHERE idenviotaller = ?) AS exist';
    keys = [idEnviotaller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller verificad@' });
    });
};

Enviotaller.insert = (Enviotaller, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO enviotaller SET ?';
    keys = [Enviotaller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller cread@' });
    });
};

Enviotaller.update = (Enviotaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE enviotaller SET ? WHERE idenviotaller = ? AND created_by = ?';
        keys = [Enviotaller, Enviotaller.idenviotaller, created_by];
    } else {
        query = 'UPDATE enviotaller SET ? WHERE idenviotaller = ?';
        keys = [Enviotaller, Enviotaller.idenviotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller actualizad@' });
    });
};

Enviotaller.remove = (idenviotaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM enviotaller WHERE idenviotaller = ? AND created_by = ?';
        keys = [idenviotaller, created_by];
    } else {
        query = 'DELETE FROM enviotaller WHERE idenviotaller = ?';
        keys = [idenviotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller eliminad@' });
    });
};

Enviotaller.logicRemove = (idenviotaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE enviotaller SET baja = 1 WHERE idenviotaller = ? AND created_by = ?';
        keys = [idenviotaller, created_by];
    } else {
        query = 'UPDATE enviotaller SET baja = 1 WHERE idenviotaller = ?';
        keys = [idenviotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Enviotaller eliminad@' });
    });
};

Enviotaller.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Enviotaller;
