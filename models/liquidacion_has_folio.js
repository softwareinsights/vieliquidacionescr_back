const connection = require('../config/db-connection');

const Liquidacion_has_folio = {};

Liquidacion_has_folio.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion_has_folio.*, _liquidacion_idliquidacion. as liquidacion_liquidacion_idliquidacion , _folio_idfolio. as folio_folio_idfolio FROM liquidacion_has_folio INNER JOIN liquidacion as _liquidacion_idliquidacion ON _liquidacion_idliquidacion.idliquidacion = liquidacion_has_folio.liquidacion_idliquidacion INNER JOIN folio as _folio_idfolio ON _folio_idfolio.idfolio = liquidacion_has_folio.folio_idfolio   WHERE created_by = ? HAVING liquidacion_has_folio.baja IS NULL OR liquidacion_has_folio.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT liquidacion_has_folio.*, _liquidacion_idliquidacion. as liquidacion_liquidacion_idliquidacion , _folio_idfolio. as folio_folio_idfolio FROM liquidacion_has_folio INNER JOIN liquidacion as _liquidacion_idliquidacion ON _liquidacion_idliquidacion.idliquidacion = liquidacion_has_folio.liquidacion_idliquidacion INNER JOIN folio as _folio_idfolio ON _folio_idfolio.idfolio = liquidacion_has_folio.folio_idfolio   HAVING liquidacion_has_folio.baja IS NULL OR liquidacion_has_folio.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio leíd@' });
    });
};

Liquidacion_has_folio.findById = (idLiquidacion_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM liquidacion_has_folio WHERE idliquidacion_has_folio = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion_has_folio, created_by];
    } else {
        query = 'SELECT * FROM liquidacion_has_folio WHERE idliquidacion_has_folio = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio encontrad@' });
    });
};

Liquidacion_has_folio.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idliquidacion_has_folio) AS count FROM liquidacion_has_folio';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio contabilizad@' });
    });
};

Liquidacion_has_folio.exist = (idLiquidacion_has_folio, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM liquidacion_has_folio WHERE idliquidacion_has_folio = ?) AS exist';
    keys = [idLiquidacion_has_folio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio verificad@' });
    });
};

Liquidacion_has_folio.insert = (Liquidacion_has_folio, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO liquidacion_has_folio SET ?';
    keys = [Liquidacion_has_folio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio cread@' });
    });
};

Liquidacion_has_folio.update = (Liquidacion_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion_has_folio SET ? WHERE idliquidacion_has_folio = ? AND created_by = ?';
        keys = [Liquidacion_has_folio, Liquidacion_has_folio.idliquidacion_has_folio, created_by];
    } else {
        query = 'UPDATE liquidacion_has_folio SET ? WHERE idliquidacion_has_folio = ?';
        keys = [Liquidacion_has_folio, Liquidacion_has_folio.idliquidacion_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio actualizad@' });
    });
};

Liquidacion_has_folio.remove = (idliquidacion_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM liquidacion_has_folio WHERE idliquidacion_has_folio = ? AND created_by = ?';
        keys = [idliquidacion_has_folio, created_by];
    } else {
        query = 'DELETE FROM liquidacion_has_folio WHERE idliquidacion_has_folio = ?';
        keys = [idliquidacion_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio eliminad@' });
    });
};

Liquidacion_has_folio.logicRemove = (idliquidacion_has_folio, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion_has_folio SET baja = 1 WHERE idliquidacion_has_folio = ? AND created_by = ?';
        keys = [idliquidacion_has_folio, created_by];
    } else {
        query = 'UPDATE liquidacion_has_folio SET baja = 1 WHERE idliquidacion_has_folio = ?';
        keys = [idliquidacion_has_folio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion_has_folio eliminad@' });
    });
};

Liquidacion_has_folio.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Liquidacion_has_folio;
