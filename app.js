const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

//Route importation.
const bonificacion = require('./routes/bonificacions');
const boni_has_liqui = require('./routes/boni_has_liquis');
const chofer = require('./routes/chofers');
const concepto = require('./routes/conceptos');
const corralon = require('./routes/corralons');
const egresoconcepto = require('./routes/egresoconceptos');
const enviotaller = require('./routes/enviotallers');
const fianza = require('./routes/fianzas');
const fianza_has_folio = require('./routes/fianza_has_folios');
const folio = require('./routes/folios');
const liquidacion = require('./routes/liquidacions');
const liquidacion_has_folio = require('./routes/liquidacion_has_folios');
const mecanico = require('./routes/mecanicos');
const orden = require('./routes/ordens');
const orden_has_refaccion = require('./routes/orden_has_refaccions');
const permisotaxi = require('./routes/permisotaxis');
const permisotaxiasignado = require('./routes/permisotaxiasignados');
const persona = require('./routes/personas');
const refaccion = require('./routes/refaccions');
const taller = require('./routes/tallers');
const vehiculo = require('./routes/vehiculos');
const vehiculoreparando = require('./routes/vehiculoreparandos');
const si_modulo = require('./routes/si_modulos');
const si_permiso = require('./routes/si_permisos');
const si_rol = require('./routes/si_rols');
const si_user = require('./routes/si_users');
const si_reporte = require('./routes/si_reportes');

// Express Instance
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Initialize passport
app.use(passport.initialize());

// Call passport Strategy
require('./config/passport')(passport);

// Warehouses
app.use('/bonificacion', bonificacion);
app.use('/boni_has_liqui', boni_has_liqui);
app.use('/chofer', chofer);
app.use('/concepto', concepto);
app.use('/corralon', corralon);
app.use('/egresoconcepto', egresoconcepto);
app.use('/enviotaller', enviotaller);
app.use('/fianza', fianza);
app.use('/fianza_has_folio', fianza_has_folio);
app.use('/folio', folio);
app.use('/liquidacion', liquidacion);
app.use('/liquidacion_has_folio', liquidacion_has_folio);
app.use('/mecanico', mecanico);
app.use('/orden', orden);
app.use('/orden_has_refaccion', orden_has_refaccion);
app.use('/permisotaxi', permisotaxi);
app.use('/permisotaxiasignado', permisotaxiasignado);
app.use('/persona', persona);
app.use('/refaccion', refaccion);
app.use('/taller', taller);
app.use('/vehiculo', vehiculo);
app.use('/vehiculoreparando', vehiculoreparando);
app.use('/si_modulo', si_modulo);
app.use('/si_permiso', si_permiso);
app.use('/si_rol', si_rol);
app.use('/si_user', si_user);
app.use('/si_reporte', si_reporte);

// Set port
app.listen(3000);
