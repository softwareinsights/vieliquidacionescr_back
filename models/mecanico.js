const connection = require('../config/db-connection');

const Mecanico = {};

Mecanico.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT mecanico.*, _persona_idpersona.nombre as persona_persona_idpersona , _taller_idtaller.nombre as taller_taller_idtaller FROM mecanico INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = mecanico.persona_idpersona INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = mecanico.taller_idtaller   WHERE created_by = ? HAVING mecanico.baja IS NULL OR mecanico.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT mecanico.*, _persona_idpersona.nombre as persona_persona_idpersona , _taller_idtaller.nombre as taller_taller_idtaller FROM mecanico INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = mecanico.persona_idpersona INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = mecanico.taller_idtaller   HAVING mecanico.baja IS NULL OR mecanico.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico leíd@' });
    });
};

Mecanico.findById = (idMecanico, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM mecanico WHERE idmecanico = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idMecanico, created_by];
    } else {
        query = 'SELECT * FROM mecanico WHERE idmecanico = ? HAVING baja IS NULL OR baja = false';
        keys = [idMecanico];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico encontrad@' });
    });
};

Mecanico.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idmecanico) AS count FROM mecanico';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico contabilizad@' });
    });
};

Mecanico.exist = (idMecanico, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM mecanico WHERE idmecanico = ?) AS exist';
    keys = [idMecanico];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico verificad@' });
    });
};

Mecanico.insert = (Mecanico, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO mecanico SET ?';
    keys = [Mecanico];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico cread@' });
    });
};

Mecanico.update = (Mecanico, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE mecanico SET ? WHERE idmecanico = ? AND created_by = ?';
        keys = [Mecanico, Mecanico.idmecanico, created_by];
    } else {
        query = 'UPDATE mecanico SET ? WHERE idmecanico = ?';
        keys = [Mecanico, Mecanico.idmecanico];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico actualizad@' });
    });
};

Mecanico.remove = (idmecanico, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM mecanico WHERE idmecanico = ? AND created_by = ?';
        keys = [idmecanico, created_by];
    } else {
        query = 'DELETE FROM mecanico WHERE idmecanico = ?';
        keys = [idmecanico];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico eliminad@' });
    });
};

Mecanico.logicRemove = (idmecanico, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE mecanico SET baja = 1 WHERE idmecanico = ? AND created_by = ?';
        keys = [idmecanico, created_by];
    } else {
        query = 'UPDATE mecanico SET baja = 1 WHERE idmecanico = ?';
        keys = [idmecanico];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mecanico eliminad@' });
    });
};

Mecanico.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Mecanico;
