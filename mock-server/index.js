// index.js
const express = require('express');
const piezasMocks = require('./mocks/piezas'); // Path para consumir los mocks del archivo piezas.js esté en el mismo directorio
const avisoMocks = require('./mocks/avisoViaje');

const app = express();
app.use(express.json());

const winston = require('winston');
const L = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});


// Ruta GET para seguimiento de una pieza
app.get('/clientes/seguimientopieza', (req, res) => {
    try {
        const { NumeroPiezaCliente} = req.query;
        const token = req.headers.authorization?.replace('Bearer ', '');

        const selector = token || NumeroPiezaCliente;

        const mockResponse = mockGetPiezas(selector);

        if (!mockResponse) {
            return res.status(200).json({ mensaje: 'Mock por defecto' });
        }

        return res.status(200).json(mockResponse);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Función de selección de mocks para seguimiento de pieza
function mockGetPiezas(token) {
    console.info('Selector recibido:', token);
    switch (token) {
        case 'tarjetaEnSucursal': return piezasMocks.tarjetaEnSucursal();
        case 'enSucursal': return piezasMocks.enSucursal();
        case 'domicilio': return piezasMocks.domicilio();
        case 'rendidaBanco': return piezasMocks.rendidaBanco();
        case 'estadoActualDistintoDeTraces': return piezasMocks.estadoActualDistintoDeTraces();
        case 'estadoFueraSinRastroEnTraces': return piezasMocks.estadoFueraSinRastroEnTraces();
        case 'estadoYaPresenteEnTraces': return piezasMocks.estadoYaPresenteEnTraces();
        case 'estadoUnicoRepetido': return piezasMocks.estadoUnicoRepetido();
        case 'estadoMultipleDiferente': return piezasMocks.estadoMultipleDiferente();
        case 'estadoIncluidoEnMuchos': return piezasMocks.estadoIncluidoEnMuchos();
        case 'estadoExcluidoEnMuchos': return piezasMocks.estadoExcluidoEnMuchos();
        default:
            console.warn('Mock no encontrado. Devolviendo uno por defecto.');
            return piezasMocks.tarjetaEnSucursal(); // por defecto
    }
}

// Ruta GET para consulta de piezas (casos con varias o una tarjeta)
app.get('/clientes/consultapiezas', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        const errorResponses = {
            '401': { status: 401, message: 'Access Token inválido' },
            '403': { status: 403, message: 'Refresh Token expirado' },
            '404': { status: 404, message: 'Error 404 al intentar obtener piezas' },
            '500': { status: 500, message: 'Error 500 al intentar obtener piezas' },
        };

        if (errorResponses[token]) {
            return res.status(errorResponses[token].status).json({ error: errorResponses[token].message });
        }

        const mockResponse = getMockEnvioPiezas(token);
        return res.status(200).json(mockResponse);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Función de selección de mocks para consulta de piezas
function getMockEnvioPiezas(token) {
    console.info('Token recibido para consulta de piezas:', token);
    const mockResponses = {
        variasTarjetas: piezasMocks.variasTarjetas,
        unaTarjeta: piezasMocks.unaTarjeta,
    };

    return (mockResponses[token] || piezasMocks.unaTarjeta)();
}

// Ruta auxiliar para simular un delay
app.post('/test/delay', async (req, res) => {
    const milisec = parseInt(req.query.milisec) || 1000;
    console.log(`Simulando espera de ${milisec} ms...`);
    await new Promise(resolve => setTimeout(resolve, milisec));
    res.status(200).json({ status: 'OK', delay: milisec });
});

// Arranque del servidor local
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor mock activo en http://localhost:${PORT}`);
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
        //variosAvisos: avisoMocks.variosAvisosDeViaje, Esto de aca esta sin uso eliminar
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

// app.delete('/clientes/tarjetas/viajes/avisos/elimina/:viajeId', (req, res) => {
//     try {
//         const token = req.headers.authorization?.replace('Bearer ', '');
//         const { viajeId } = req.params;

//         if (!token) {
//             return res.status(401).json({
//                 error_code: 'SecurityException',
//                 message: 'La información de seguridad no es válida', //Ok
//             });
//         }

//         if (!viajeId) {
//             return res.status(400).json({
//                 error_code: 'BadRequest',
//                 message: "Falta el campo 'viajeId' en los params",
//             });
//         }

//         // Simular token inválido o vencido
//         if (token === '403') {
//             return res.status(403).json({
//                 error_code: '',
//                 message: 'Token sin permisos suficientes', //ok
//             });
//         }

//         // Simular viaje no encontrado
//         if (viajeId === '999') {
//             return res.status(404).json({
//                 error_code: '',
//                 message: 'Viaje no encontrado',
//             });
//         }

//         // Simular error interno
//         if (token === '500') {
//             return res.status(500).json({
//                 error_code: 'ServiceException',
//                 message: 'Error interno, por favor vuelva a intentar.',
//             });
//         }

//         // Caso de éxito
//         L.info('Token recibido para eliminar aviso de viaje:', token);
//         L.info('ID a eliminar:', viajeId);
//         return res.status(204).send(); // 204 sin body
//     } catch (e) {
//         return res.status(500).json({
//             error_code: 'ServiceException',
//             message: e.message,
//         });
//     }
// });

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