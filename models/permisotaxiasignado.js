const connection = require('../config/db-connection');

const Permisotaxiasignado = {};

Permisotaxiasignado.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _persona.nombre as chofer_chofer_idchofer , _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxiasignado.vehiculo_idvehiculo INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _persona.nombre as chofer_chofer_idchofer , _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxiasignado.vehiculo_idvehiculo INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado leíd@' });
    });
};

Permisotaxiasignado.findById = (idPermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiasignado, created_by];
    } else {
        query = 'SELECT * FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado encontrad@' });
    });
};

Permisotaxiasignado.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisotaxiasignado) AS count FROM permisotaxiasignado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado contabilizad@' });
    });
};

Permisotaxiasignado.exist = (idPermisotaxiasignado, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisotaxiasignado WHERE idpermisotaxiasignado = ?) AS exist';
    keys = [idPermisotaxiasignado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado verificad@' });
    });
};

Permisotaxiasignado.insert = (Permisotaxiasignado, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisotaxiasignado SET ?';
    keys = [Permisotaxiasignado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado cread@' });
    });
};

Permisotaxiasignado.update = (Permisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiasignado SET ? WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [Permisotaxiasignado, Permisotaxiasignado.idpermisotaxiasignado, created_by];
    } else {
        query = 'UPDATE permisotaxiasignado SET ? WHERE idpermisotaxiasignado = ?';
        keys = [Permisotaxiasignado, Permisotaxiasignado.idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado actualizad@' });
    });
};

Permisotaxiasignado.remove = (idpermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [idpermisotaxiasignado, created_by];
    } else {
        query = 'DELETE FROM permisotaxiasignado WHERE idpermisotaxiasignado = ?';
        keys = [idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado eliminad@' });
    });
};

Permisotaxiasignado.logicRemove = (idpermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiasignado SET baja = 1 WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [idpermisotaxiasignado, created_by];
    } else {
        query = 'UPDATE permisotaxiasignado SET baja = 1 WHERE idpermisotaxiasignado = ?';
        keys = [idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado eliminad@' });
    });
};

Permisotaxiasignado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisotaxiasignado;
