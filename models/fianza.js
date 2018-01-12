const connection = require('../config/db-connection');

const Fianza = {};

Fianza.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT fianza.*, _persona.nombre as chofer_chofer_idchofer FROM fianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = fianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE created_by = ? HAVING fianza.baja IS NULL OR fianza.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT fianza.*, _persona.nombre as chofer_chofer_idchofer FROM fianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = fianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING fianza.baja IS NULL OR fianza.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza leíd@' });
    });
};

Fianza.findById = (idFianza, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM fianza WHERE idfianza = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idFianza, created_by];
    } else {
        query = 'SELECT * FROM fianza WHERE idfianza = ? HAVING baja IS NULL OR baja = false';
        keys = [idFianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza encontrad@' });
    });
};

Fianza.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idfianza) AS count FROM fianza';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Fianza contabilizad@' });
    });
};

Fianza.exist = (idFianza, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM fianza WHERE idfianza = ?) AS exist';
    keys = [idFianza];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Fianza verificad@' });
    });
};

Fianza.insert = (Fianza, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO fianza SET ?';
    keys = [Fianza];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Fianza cread@' });
    });
};

Fianza.update = (Fianza, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE fianza SET ? WHERE idfianza = ? AND created_by = ?';
        keys = [Fianza, Fianza.idfianza, created_by];
    } else {
        query = 'UPDATE fianza SET ? WHERE idfianza = ?';
        keys = [Fianza, Fianza.idfianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza actualizad@' });
    });
};

Fianza.remove = (idfianza, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM fianza WHERE idfianza = ? AND created_by = ?';
        keys = [idfianza, created_by];
    } else {
        query = 'DELETE FROM fianza WHERE idfianza = ?';
        keys = [idfianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza eliminad@' });
    });
};

Fianza.logicRemove = (idfianza, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE fianza SET baja = 1 WHERE idfianza = ? AND created_by = ?';
        keys = [idfianza, created_by];
    } else {
        query = 'UPDATE fianza SET baja = 1 WHERE idfianza = ?';
        keys = [idfianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza eliminad@' });
    });
};

Fianza.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Fianza;
