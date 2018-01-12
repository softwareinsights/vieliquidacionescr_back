const connection = require('../config/db-connection');

const Egresoconcepto = {};

Egresoconcepto.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT egresoconcepto.*, _taller_idtaller.nombre as taller_taller_idtaller , _concepto_idconcepto.nombre as concepto_concepto_idconcepto FROM egresoconcepto INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto   WHERE created_by = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT egresoconcepto.*, _taller_idtaller.nombre as taller_taller_idtaller , _concepto_idconcepto.nombre as concepto_concepto_idconcepto FROM egresoconcepto INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto   HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto leíd@' });
    });
};

Egresoconcepto.findById = (idEgresoconcepto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM egresoconcepto WHERE idegresoconcepto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEgresoconcepto, created_by];
    } else {
        query = 'SELECT * FROM egresoconcepto WHERE idegresoconcepto = ? HAVING baja IS NULL OR baja = false';
        keys = [idEgresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto encontrad@' });
    });
};

Egresoconcepto.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idegresoconcepto) AS count FROM egresoconcepto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto contabilizad@' });
    });
};

Egresoconcepto.exist = (idEgresoconcepto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM egresoconcepto WHERE idegresoconcepto = ?) AS exist';
    keys = [idEgresoconcepto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto verificad@' });
    });
};

Egresoconcepto.insert = (Egresoconcepto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO egresoconcepto SET ?';
    keys = [Egresoconcepto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto cread@' });
    });
};

Egresoconcepto.update = (Egresoconcepto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE egresoconcepto SET ? WHERE idegresoconcepto = ? AND created_by = ?';
        keys = [Egresoconcepto, Egresoconcepto.idegresoconcepto, created_by];
    } else {
        query = 'UPDATE egresoconcepto SET ? WHERE idegresoconcepto = ?';
        keys = [Egresoconcepto, Egresoconcepto.idegresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto actualizad@' });
    });
};

Egresoconcepto.remove = (idegresoconcepto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM egresoconcepto WHERE idegresoconcepto = ? AND created_by = ?';
        keys = [idegresoconcepto, created_by];
    } else {
        query = 'DELETE FROM egresoconcepto WHERE idegresoconcepto = ?';
        keys = [idegresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto eliminad@' });
    });
};

Egresoconcepto.logicRemove = (idegresoconcepto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE egresoconcepto SET baja = 1 WHERE idegresoconcepto = ? AND created_by = ?';
        keys = [idegresoconcepto, created_by];
    } else {
        query = 'UPDATE egresoconcepto SET baja = 1 WHERE idegresoconcepto = ?';
        keys = [idegresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto eliminad@' });
    });
};

Egresoconcepto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Egresoconcepto;
