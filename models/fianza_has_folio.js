const connection = require('../config/db-connection');

const Fianza_has_folio = {};

Fianza_has_folio.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT fianza_has_folio.*, _fianza_idfianza. as fianza_fianza_idfianza , _folio_idfolio. as folio_folio_idfolio FROM fianza_has_folio INNER JOIN fianza as _fianza_idfianza ON _fianza_idfianza.idfianza = fianza_has_folio.fianza_idfianza INNER JOIN folio as _folio_idfolio ON _folio_idfolio.idfolio = fianza_has_folio.folio_idfolio   WHERE created_by = ? HAVING fianza_has_folio.baja IS NULL OR fianza_has_folio.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT fianza_has_folio.*, _fianza_idfianza. as fianza_fianza_idfianza , _folio_idfolio. as folio_folio_idfolio FROM fianza_has_folio INNER JOIN fianza as _fianza_idfianza ON _fianza_idfianza.idfianza = fianza_has_folio.fianza_idfianza INNER JOIN folio as _folio_idfolio ON _folio_idfolio.idfolio = fianza_has_folio.folio_idfolio   HAVING fianza_has_folio.baja IS NULL OR fianza_has_folio.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio leíd@' });
    });
};

Fianza_has_folio.findById = (idFianza_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM fianza_has_folio WHERE idfianza_has_folio = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idFianza_has_folio, created_by];
    } else {
        query = 'SELECT * FROM fianza_has_folio WHERE idfianza_has_folio = ? HAVING baja IS NULL OR baja = false';
        keys = [idFianza_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio encontrad@' });
    });
};

Fianza_has_folio.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idfianza_has_folio) AS count FROM fianza_has_folio';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio contabilizad@' });
    });
};

Fianza_has_folio.exist = (idFianza_has_folio, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM fianza_has_folio WHERE idfianza_has_folio = ?) AS exist';
    keys = [idFianza_has_folio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio verificad@' });
    });
};

Fianza_has_folio.insert = (Fianza_has_folio, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO fianza_has_folio SET ?';
    keys = [Fianza_has_folio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio cread@' });
    });
};

Fianza_has_folio.update = (Fianza_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE fianza_has_folio SET ? WHERE idfianza_has_folio = ? AND created_by = ?';
        keys = [Fianza_has_folio, Fianza_has_folio.idfianza_has_folio, created_by];
    } else {
        query = 'UPDATE fianza_has_folio SET ? WHERE idfianza_has_folio = ?';
        keys = [Fianza_has_folio, Fianza_has_folio.idfianza_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio actualizad@' });
    });
};

Fianza_has_folio.remove = (idfianza_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM fianza_has_folio WHERE idfianza_has_folio = ? AND created_by = ?';
        keys = [idfianza_has_folio, created_by];
    } else {
        query = 'DELETE FROM fianza_has_folio WHERE idfianza_has_folio = ?';
        keys = [idfianza_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio eliminad@' });
    });
};

Fianza_has_folio.logicRemove = (idfianza_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE fianza_has_folio SET baja = 1 WHERE idfianza_has_folio = ? AND created_by = ?';
        keys = [idfianza_has_folio, created_by];
    } else {
        query = 'UPDATE fianza_has_folio SET baja = 1 WHERE idfianza_has_folio = ?';
        keys = [idfianza_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Fianza_has_folio eliminad@' });
    });
};

Fianza_has_folio.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Fianza_has_folio;
