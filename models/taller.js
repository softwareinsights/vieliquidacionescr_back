const connection = require('../config/db-connection');

const Taller = {};

Taller.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT taller.* FROM taller    WHERE created_by = ? HAVING taller.baja IS NULL OR taller.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT taller.* FROM taller    HAVING taller.baja IS NULL OR taller.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller leíd@' });
    });
};

Taller.findById = (idTaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM taller WHERE idtaller = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT * FROM taller WHERE idtaller = ? HAVING baja IS NULL OR baja = false';
        keys = [idTaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller encontrad@' });
    });
};

Taller.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtaller) AS count FROM taller';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Taller contabilizad@' });
    });
};

Taller.exist = (idTaller, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM taller WHERE idtaller = ?) AS exist';
    keys = [idTaller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Taller verificad@' });
    });
};

Taller.insert = (Taller, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO taller SET ?';
    keys = [Taller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Taller cread@' });
    });
};

Taller.update = (Taller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE taller SET ? WHERE idtaller = ? AND created_by = ?';
        keys = [Taller, Taller.idtaller, created_by];
    } else {
        query = 'UPDATE taller SET ? WHERE idtaller = ?';
        keys = [Taller, Taller.idtaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller actualizad@' });
    });
};

Taller.remove = (idtaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM taller WHERE idtaller = ? AND created_by = ?';
        keys = [idtaller, created_by];
    } else {
        query = 'DELETE FROM taller WHERE idtaller = ?';
        keys = [idtaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller eliminad@' });
    });
};

Taller.logicRemove = (idtaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE taller SET baja = 1 WHERE idtaller = ? AND created_by = ?';
        keys = [idtaller, created_by];
    } else {
        query = 'UPDATE taller SET baja = 1 WHERE idtaller = ?';
        keys = [idtaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller eliminad@' });
    });
};

Taller.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Taller;
