// index.js
const express = require('express');
const piezasMocks = require('./mocks/piezas'); // Path para consumir los mocks del archivo piezas.js esté en el mismo directorio

const app = express();
app.use(express.json());

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
