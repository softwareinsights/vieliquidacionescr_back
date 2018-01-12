const connection = require('../config/db-connection');

const Si_permiso = {};

Si_permiso.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT si_permiso.*, _Rol_idsi_rol.nombre as si_rol_Rol_idsi_rol , _Modulo_idsi_modulo.nombre as si_modulo_Modulo_idsi_modulo FROM si_permiso INNER JOIN si_rol as _Rol_idsi_rol ON _Rol_idsi_rol.idsi_rol = si_permiso.Rol_idsi_rol INNER JOIN si_modulo as _Modulo_idsi_modulo ON _Modulo_idsi_modulo.idsi_modulo = si_permiso.Modulo_idsi_modulo   WHERE created_by = ? HAVING si_permiso.baja IS NULL OR si_permiso.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT si_permiso.*, _Rol_idsi_rol.nombre as si_rol_Rol_idsi_rol , _Modulo_idsi_modulo.nombre as si_modulo_Modulo_idsi_modulo FROM si_permiso INNER JOIN si_rol as _Rol_idsi_rol ON _Rol_idsi_rol.idsi_rol = si_permiso.Rol_idsi_rol INNER JOIN si_modulo as _Modulo_idsi_modulo ON _Modulo_idsi_modulo.idsi_modulo = si_permiso.Modulo_idsi_modulo   HAVING si_permiso.baja IS NULL OR si_permiso.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso leíd@' });
    });
};

Si_permiso.findById = (idSi_permiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM si_permiso WHERE idsi_permiso = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_permiso, created_by];
    } else {
        query = 'SELECT * FROM si_permiso WHERE idsi_permiso = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso encontrad@' });
    });
};

Si_permiso.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsi_permiso) AS count FROM si_permiso';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso contabilizad@' });
    });
};

Si_permiso.exist = (idSi_permiso, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM si_permiso WHERE idsi_permiso = ?) AS exist';
    keys = [idSi_permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso verificad@' });
    });
};

Si_permiso.insert = (Si_permiso, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO si_permiso SET ?';
    keys = [Si_permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso cread@' });
    });
};

Si_permiso.update = (Si_permiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_permiso SET ? WHERE idsi_permiso = ? AND created_by = ?';
        keys = [Si_permiso, Si_permiso.idsi_permiso, created_by];
    } else {
        query = 'UPDATE si_permiso SET ? WHERE idsi_permiso = ?';
        keys = [Si_permiso, Si_permiso.idsi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso actualizad@' });
    });
};

Si_permiso.remove = (idsi_permiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM si_permiso WHERE idsi_permiso = ? AND created_by = ?';
        keys = [idsi_permiso, created_by];
    } else {
        query = 'DELETE FROM si_permiso WHERE idsi_permiso = ?';
        keys = [idsi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso eliminad@' });
    });
};

Si_permiso.logicRemove = (idsi_permiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_permiso SET baja = 1 WHERE idsi_permiso = ? AND created_by = ?';
        keys = [idsi_permiso, created_by];
    } else {
        query = 'UPDATE si_permiso SET baja = 1 WHERE idsi_permiso = ?';
        keys = [idsi_permiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_permiso eliminad@' });
    });
};

Si_permiso.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_permiso;
