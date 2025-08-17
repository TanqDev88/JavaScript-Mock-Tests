// index.js
const utils = require('./utils')
const express = require('express');
const piezasMocks = require('./mocks/piezas'); // Path para consumir los mocks del archivo piezas.js esté en el mismo directorio
const avisoMocks = require('./mocks/avisoViaje');
const desvinculacionMocks = require('./mocks/desvinculacion');
const altaClienteMocks = require('./mocks/onb')

const app = express();
app.use(express.json());

const winston = require('winston');
const L = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

let counter = 0;


// Ruta GET para seguimiento de una pieza
app.get('/clientes/seguimientopieza', (req, res) => {
    try {
        const { NumeroPiezaCliente, ProveedorCorreo } = req.query; // const defaultResponse = mockGetPiezas()
        const token = req.headers.authorization.replace('Bearer ', '');
        const mockResponse = mockGetPiezas(token);

        if (!mockResponse) {
            return res.status(200).json(defaultResponse);
        }
        return res.status(200).json(mockResponse);
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

function mockGetPiezas(numeroPiezaCliente) {
    L.info('numeroPiezaCliente recibido:', numeroPiezaCliente);
    let response;
    switch (numeroPiezaCliente) {
        case 'tarjetaEnSucursal':
            response = piezasMocks.enSucursal();
            break;
        case 'enSucursal':
            response = piezasMocks.tarjetaElejidaSucursal();
            break;
        case 'noTeEncontramos':
            response = piezasMocks.noTeEncontramos();
            break;
        case 'enDistribucion':
            response = piezasMocks.enDistribucion();
            break;
        case 'domicilio':
            response = piezasMocks.domicilio();
            break;
        case 'rendidaBanco':
            response = piezasMocks.rendidaBanco();
            break;
        case 'estadoActualDistintoDeTraces':
            response = piezasMocks.estadoActualDistintoDeTraces();
            break;
        case 'estadoFueraSinRastroEnTraces':
            response = piezasMocks.estadoFueraSinRastroEnTraces();
            break;
        case 'estadoYaPresenteEnTraces':
            response = piezasMocks.estadoYaPresenteEnTraces();
            break;
        case 'estadoUnicoRepetido':
            response = piezasMocks.estadoUnicoRepetido();
            break;
        case 'estadoMultipleDiferente':
            response = piezasMocks.estadoMultipleDiferente();
            break;
        case 'estadoIncluidoEnMuchos':
            response = piezasMocks.estadoIncluidoEnMuchos();
            break;
        case 'estadoExcluidoEnMuchos':
            response = piezasMocks.estadoExcluidoEnMuchos();
            break;
        case 'seguimientoSegundaVisita':
            response = piezasMocks.seguimientoSegundaVisita ();
            break;
        case 'SeguimientoPiezaSeMudo':
            response = piezasMocks.SeguimientoPiezaSeMudo ();
            break;
        default:
            response = piezasMocks.tarjetaEnSucursal();
            break;
    }
    return response;
}

app.get('/clientes/consultapiezas', (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    // Manejo de errores por código de token
    const errorResponses = {
        401: { status: 401, message: 'Access Token inválido' },
        403: { status: 403, message: 'Refresh Token expirado' },
        404: { status: 404, message: 'Error 404 al intentar obtener piezas' },
        500: { status: 500, message: 'Error 500 al intentar obtener piezas' },
    };

    if (errorResponses[token]) {
        return res.status(errorResponses[token].status).json({ error: errorResponses[token].message });
    }

    // Obtener respuesta mock
    const mockResponse = getMockEnvioPiezas(token);
    return res.status(200).json(mockResponse);
});

function getMockEnvioPiezas(token) {
    L.info('numeroPiezaCliente recibido:', token);

    const mockResponses = {
        variasTarjetas: piezasMocks.variasTarjetas,
        unaTarjeta: piezasMocks.unaTarjetaElejida,
        envioPiezaSeMudo: piezasMocks.envioPiezaSeMudo,
    };

    // Si no hay match, se devuelve `unaTarjeta` por defecto
    return (mockResponses[token] || piezasMocks.unaTarjeta)();
}

app.post('/test/delay', async (req, res) => {
    try {
        const { milisec } = req.query;

        L.info('Espera por ' + milisec);

        await sleep(milisec);

        res.status(200).json({ status: 'OK' });
    } catch (e) {
        return res.status(500).json(e.message);
    }
});


//****************************************Mocks para servicios Aviso de viaje*****************

// ==========================================================================
//                          CONSULTA AVISO DE VIAJE
// ==========================================================================
app.get('/clientes/avisoviaje', (req, res) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');

        const mockResponse = getMockAvisoDeViaje(token);
        if (!mockResponse.viajes) {
            return res.status(404);
        } else {
            return res.status(200).json(mockResponse);
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

function getMockAvisoDeViaje(token) {
    L.info('Token recibido para consulta aviso de viaje:', token);

    const mockResponses = {
        unaTarjeta: avisoMocks.avisoDeViajeunaTarjeta,
        variasTarjetas: avisoMocks.avisoDeViajeVariasTarjetas,
        sinTarjetas: avisoMocks.avisoDeViajeSinTarjetas,
    };

    return (mockResponses[token] || avisoDeViajeunaTarjeta)();
}

//==========================================================================
//                          GENERAR AVISO DE VIAJE DINÁMICO
// ==========================================================================
app.post('/clientes/avisoviaje', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const body = req.body;

        L.info('Token recibido para generar aviso de viaje:', token);
        L.info('Datos recibidos:', body);

        return res.status(200).json({
            viajeid: '1234',
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// ==========================================================================
//                          ELIMINAR AVISO DE VIAJE
// ==========================================================================
app.delete('/clientes/tarjetas/viajes/avisos/elimina/:id', (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Falta el campo 'id' en los params" });
        }

        L.info('Token recibido para eliminar aviso de viaje:', token || '[NO RECIBIDO]');
        L.info('ID a eliminar:', id || '[NO RECIBIDO]');

        const mockResponse = avisoMocks.eliminarAvisoDeViaje(id);
        L.info(`Mensaje final: ${mockResponse.mensaje} - ID: ${mockResponse.id_eliminado}`);

        return res.status(200).json(mockResponse);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// ==========================================================================
//                          TARJETAS PARA AVISO DE VIAJE
// ==========================================================================
app.get('/clientes/avisoviaje/tarjetas', (req, res) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');

        const mockResponse = getMockTarjetasParaAvisoDeViaje(token);
        return res.status(200).json(mockResponse);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

function getMockTarjetasParaAvisoDeViaje(token) {
    L.info('Token recibido para tarjetas para aviso de viaje:', token);

    const mockResponses = {
        UnaSola: avisoMocks.tarjetasParaAvisoDeViajeUnaSola,
        Varias: avisoMocks.tarjetasParaAvisoDeViajeVarias,
        Ninguna: avisoMocks.tarjetasParaAvisoDeViajeNinguna,
        Diez: avisoMocks.tarjetasParaAvisoDeViajeDiez,
    };

    return (mockResponses[token] || avisoMocks.tarjetasParaAvisoDeViajeUnaSola)();
}

app.post('/reintentos', async (req, res) => {
    const count = await counter.writeCounter();

    L.info(`Received request #${count}`);

    if (count <= 2) {
        L.info(`Responding with 500 for request #${count}`);
        res.status(500).json({
            message: 'Internal Server Error - Service temporarily unavailable',
            attempt: count,
        });
    } else {
        counter.resetCounter();
        L.info(`Responding with 200 for request #${count}`);
        res.status(200).json({
            message: 'OK - Service is now available',
            attempt: count,
        });
    }
});

app.get('/clientes/:hashCliente/enrolamiento', (req, res) => {
    const { hashCliente } = req.params;
    const modulo = req.query.modulo;
    L.info('Modulo', modulo);
    let response;
    const hash =
        'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1RUjA1MlltNVNiR1ZJVVN0UVNGSndZbGRXVkdSSFJuUmpSRFI0VG5wTmVrNUVTVEZQUkdzd1VFTTVNR0ZYTVd4Vk0xSm9ZbGhCSzFCSVRteGpNMDV3WWpJMEsxbHFUVEpOUjFacFRsUkJkRTV0VFhsTmVUQXdXVEpKZWt4VWJHcFBWMGwwVFVSWk5GcHFWbXBQVkZFMVdWUkZNVkJET1hwYVdFNTZZVmM1ZFZCcWQzWlpNamwxWkVkV05HUkVORGhaTW5od1dsYzFNRkJxZUVSaU1sSndXakk1U2xwSFZuVmtSMnh0WVZkT2FGa3liSFppYWpSM1RWUjNkbEV5T1d0aFYyUjJVMWRTYkdKdVVuQmFiV3hxV1ZkT2NHSXlOQ3RRUlRVeFlsZFdlV0l3Ykd0YVZ6VXdZVmRhY0ZreVJtcGhWemwxVUdwUk0wMVVWWGxOZWxVeVVFTTVUMlJYTVd4amJUbEtXa2RXZFdSSGJHMWhWMDVvV1RKc2RtSnFORGhSTWpscllWZGtkbFV5VmpSaWVqVk9VRU01UkdJeVVuQmFNamxVV2xob2RsQnFlRVJpTWxKd1dqSTVWV050Ykdsa1dGSm9ZMjFzZGxCcVFUUlFRemxFWWpKU2NGb3lPVlZqYld4cFpGaFNhR050YkhaUWFuaFBaRmN4YkdOdE9WVmpiV3hwWkZoU2FHTnRiSFpRYWtsNlRrUmplRTVVU1hwT1ZGazFVRU01VDJSWE1XeGpiVGxWWTIxc2FXUllVbWhqYld4MlVHcDRUMkl5TVdsamJWVXJVakJXVTFRd05VcFVWVGhuVVZWc1QxQkRPVTlpTWpGcFkyMVZLMUJGUm5kYVYzaHpZVmRTZGxCclNsQldSbEpHVldwM2RsRllRbXhpUjNod1drYzRLMUJGV214Wk1taG9WRzFHYW1GWE1YQmFWelV3WW5vMGVVMUVRVEpNVkVGNFRGUkpNMUJET1VkYVYwNXZXVlUxYUZreWJIUmhWMVoxWkVjNEsxQkRPV3BpUjJ4c1ltNVJLMUJET1c5WldFNXZVR2M5UFEuOWFnV2lQcmJ3RUctMFpmTjBqMkxsNFV1TzkzNThZR0hvdHd3T1duaGZQYmlQTlFxN3d4WDFmdVA5NDZFZ0RvaDI5QlI4S0NnYVZYU01maEhaQ0QyWXc=';
    L.info(hashCliente);
    if (hashCliente == hash) {
        response = 1;
    } else {
        response = 0;
    }

    res.status(200).json({ enroladobiometria: response });
});

// ==========================================================================
//                          DESVINCULACIÓN DE TELÉFONO
// ==========================================================================
app.delete('/clientes/:hashCliente/desvincula/telefono', (req, res) => {
    try {
        const { hashCliente } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        L.info('Token recibido para desvinculación:', token || '[NO RECIBIDO]');
        L.info('HashCliente:', hashCliente || '[NO RECIBIDO]');

        switch (token) {
            case 'desvincularOK':
                return res.status(204).send(); // No se envía body
            case 'error401':
                return res.status(401).json(desvinculacionMocks.error401());
            case 'error409':
                return res.status(409).json(desvinculacionMocks.error409());
            case 'error500':
                return res.status(500).json(desvinculacionMocks.error500());
            default:
                L.warn('Token no reconocido. Enviando error 401 por defecto.');
                return res.status(401).json(desvinculacionMocks.error401());
        }
    } catch (e) {
        L.error('Excepción no controlada:', e);
        return res.status(500).json({ error: e.message });
    }
});

app.post('/:state', async (req, res) => {
    counter++;
    const count = counter;

    L.info(`Received /:state request #${count}`);

    res.status(409).json({
        success: false,
        data: null,
        error: {
            code_http: 409,
            code_info: "DNI_REPETIDO",
            message: "Numero de documento duplicado."
        }
    });
});
//****************************************** Mock para el endpoint MULC*****************

app.get('/clientes/dolarmep/autorizado', (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            error_code: 'Unauthorized',
            message: 'Token no proporcionado o formato inválido.',
        });
        return;
    }

    const tokenBiometrico = authHeader.replace('Bearer ', '');

    const autorizado = get_isTokenAutorizado(tokenBiometrico);

    res.status(200).json({ autorizado: autorizado });
});

function get_isTokenAutorizado(token) {
    let response = 'false';
    const list = {
        tokenValido1: 'true',
        tokenValido2: 'false',
        tokenValido3: 'true',
        tokenValido4: 'true',
    };
    if (!_.isEmpty(list[token])) response = list[token];
    return response;
}

///****MOCK 500 */

app.post('/test-api/500', (req, res) => {
    return res.status(500).end();
});

app.get('/test-api/500', (req, res) => {
    return res.status(500).end();
});

app.post('/test-api/403', (req, res) => {
    return res.status(403).end();
});

app.get('/test-api/403', (req, res) => {
    return res.status(403).end();
});

// Arranque del servidor local
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor mock activo en http://localhost:${PORT}`);
});

//Implementacion en GCP - cloud functions
// const functions = require('@google-cloud/functions-framework');
// functions.http('mockService', app);

//****************************************Experiencia************ Mocks para servicios ONB********************************
// Alta cliente (refactor con header X-Mock-Scenario)
app.post('/clientes/altacliente', (req, res) => {
    const mockScenario = req.header('X-Mock-Scenario');
    const body = req.body;

    L.debug('body', body);
    L.info(`Mock Scenario: ${mockScenario}`);

    if (!body) return res.status(400).json({ error: 'sin body' });

    if (mockScenario && altaClienteMocks.altaCliente[mockScenario]) {
        const [status, payload] = altaClienteMocks.altaCliente[mockScenario];
        return res.status(status).json(payload);
    }

    // Si no hay mock, responder con éxito por defecto
    return res.status(200).json({ ente: '55555' });
});

// Apertura cuenta individuo
app.post('/clientes/apertura/cuentaindividuo', (req, res) => {
    const { ente, tipo_producto, oficina, direccion_envio_resumen, direccion_envio_tarjeta, direccion_email_resumen } = req.body;

    L.info('/clientes/apertura/cuentaindividuo');
    L.debug('body', req.body);

    if (
        ente == null ||
        tipo_producto == null ||
        oficina == null ||
        direccion_envio_resumen == null ||
        direccion_envio_tarjeta == null ||
        !direccion_email_resumen.trim()
    ) {
        return res.status(400).json({
            success: false,
            error: { code_http: 400, message: 'Solicitud incorrecta, falta algún parámetro obligatorio' },
        });
    }

    const error = altaClienteMocks.cuentaIndividuo[oficina];
    if (error) {
        const [status, payload] = error;
        return res.status(status).json(payload);
    }

    if (utils.compareStrings(oficina, '999')) {
        return res.status(200).json(altaClienteMocks.respuestasExito.cuentaARSyUSD);
    }
        if (utils.compareStrings(oficina, '123456')) {
        return res.status(200).json(altaClienteMocks.respuestasExito.cuentaUSD);
    }

    return res.status(200).json(altaClienteMocks.respuestasExito.cuentaARS);
});