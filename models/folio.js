const connection = require('../config/db-connection');

const Folio = {};

Folio.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT folio.* FROM folio    WHERE created_by = ? HAVING folio.baja IS NULL OR folio.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT folio.* FROM folio    HAVING folio.baja IS NULL OR folio.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Folio leíd@' });
    });
};

Folio.findById = (idFolio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM folio WHERE idfolio = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idFolio, created_by];
    } else {
        query = 'SELECT * FROM folio WHERE idfolio = ? HAVING baja IS NULL OR baja = false';
        keys = [idFolio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Folio encontrad@' });
    });
};

Folio.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idfolio) AS count FROM folio';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Folio contabilizad@' });
    });
};

Folio.exist = (idFolio, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM folio WHERE idfolio = ?) AS exist';
    keys = [idFolio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Folio verificad@' });
    });
};

Folio.insert = (Folio, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO folio SET ?';
    keys = [Folio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Folio cread@' });
    });
};

Folio.update = (Folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE folio SET ? WHERE idfolio = ? AND created_by = ?';
        keys = [Folio, Folio.idfolio, created_by];
    } else {
        query = 'UPDATE folio SET ? WHERE idfolio = ?';
        keys = [Folio, Folio.idfolio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Folio actualizad@' });
    });
};

Folio.remove = (idfolio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM folio WHERE idfolio = ? AND created_by = ?';
        keys = [idfolio, created_by];
    } else {
        query = 'DELETE FROM folio WHERE idfolio = ?';
        keys = [idfolio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Folio eliminad@' });
    });
};

Folio.logicRemove = (idfolio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE folio SET baja = 1 WHERE idfolio = ? AND created_by = ?';
        keys = [idfolio, created_by];
    } else {
        query = 'UPDATE folio SET baja = 1 WHERE idfolio = ?';
        keys = [idfolio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Folio eliminad@' });
    });
};

Folio.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Folio;
