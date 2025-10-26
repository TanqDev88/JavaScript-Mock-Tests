// index.js
"use strict";

const utils = require("./utils");
const express = require("express");
const piezasMocks = require("./mocks/piezas");
const avisoMocks = require("./mocks/avisoViaje");
const desvinculacionMocks = require("./mocks/desvinculacion");
const altaClienteMocks = require("./mocks/onb");
// const _ = require('lodash'); // Para usar lodash esta línea

const winston = require("winston");
const L = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

const app = express();
app.use(express.json());

// Health / root
app.get("/", (req, res) => res.json({ status: "ok" }));
app.get("/ping", (req, res) => res.json({ message: "pong" }));

// Helper: sleep
const sleep = (ms) => new Promise((r) => setTimeout(r, Number(ms) || 0));

// ------------------------- consulta titularidad -------------------------
app.get("/clientes/cuentas/:hash_cuenta/titularidad", (req, res) => {
  try {
    const { hash_cuenta } = req.params;
    L.info("hash_cuenta " + hash_cuenta);
    const response = consultaTitularidad.buildMockResponse(hash_cuenta);
    L.info("Mock Response" + response);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    res.status(500).json({ error: "error inesperado" });
  }
});

// ------------------------- Seguimiento pieza -------------------------
app.get("/clientes/seguimientopieza", (req, res) => {
  try {
    // si querés usar query: const { NumeroPiezaCliente } = req.query;
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    const mockResponse = mockGetPiezas(token);
    return res.status(200).json(mockResponse);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

function mockGetPiezas(numeroPiezaCliente) {
  L.info("numeroPiezaCliente/token recibido:", numeroPiezaCliente);
  let response;
  switch (numeroPiezaCliente) {
    case "tarjetaEnSucursal":
      response = piezasMocks.enSucursal();
      break;
    case "enSucursal":
      response = piezasMocks.tarjetaElejidaSucursal();
      break;
    case "noTeEncontramos":
      response = piezasMocks.noTeEncontramos();
      break;
    case "enDistribucion":
      response = piezasMocks.enDistribucion();
      break;
    case "domicilio":
      response = piezasMocks.domicilio();
      break;
    case "rendidaBanco":
      response = piezasMocks.rendidaBanco();
      break;
    case "estadoActualDistintoDeTraces":
      response = piezasMocks.estadoActualDistintoDeTraces();
      break;
    case "estadoFueraSinRastroEnTraces":
      response = piezasMocks.estadoFueraSinRastroEnTraces();
      break;
    case "estadoYaPresenteEnTraces":
      response = piezasMocks.estadoYaPresenteEnTraces();
      break;
    case "estadoUnicoRepetido":
      response = piezasMocks.estadoUnicoRepetido();
      break;
    case "estadoMultipleDiferente":
      response = piezasMocks.estadoMultipleDiferente();
      break;
    case "estadoIncluidoEnMuchos":
      response = piezasMocks.estadoIncluidoEnMuchos();
      break;
    case "estadoExcluidoEnMuchos":
      response = piezasMocks.estadoExcluidoEnMuchos();
      break;
    case "seguimientoSegundaVisita":
      response = piezasMocks.seguimientoSegundaVisita();
      break;
    case "SeguimientoPiezaSeMudo":
      response = piezasMocks.SeguimientoPiezaSeMudo();
      break;
    default:
      response = piezasMocks.tarjetaEnSucursal();
      break;
  }
  return response;
}

// ------------------------- Consulta piezas -------------------------
app.get("/clientes/consultapiezas", (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");

  const errorResponses = {
    401: { status: 401, message: "Access Token inválido" },
    403: { status: 403, message: "Refresh Token expirado" },
    404: { status: 404, message: "Error 404 al intentar obtener piezas" },
    500: { status: 500, message: "Error 500 al intentar obtener piezas" },
  };

  if (errorResponses[token]) {
    return res
      .status(errorResponses[token].status)
      .json({ error: errorResponses[token].message });
  }

  const mockResponse = getMockEnvioPiezas(token);
  return res.status(200).json(mockResponse);
});

function getMockEnvioPiezas(token) {
  L.info("token recibido consulta piezas:", token);
  const mockResponses = {
    variasTarjetas: piezasMocks.variasTarjetas,
    unaTarjeta: piezasMocks.unaTarjetaElejida,
    envioPiezaSeMudo: piezasMocks.envioPiezaSeMudo,
    unaTarjetaElejida: piezasMocks.unaTarjetaElejida,
  };
  return (mockResponses[token] || piezasMocks.unaTarjeta)();
}

// ------------------------- Delay test -------------------------
app.post("/test/delay", async (req, res) => {
  try {
    const { milisec } = req.query;
    L.info("Espera por " + milisec);
    await sleep(milisec);
    res.status(200).json({ status: "OK" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ------------------------- Aviso de viaje -------------------------
app.get("/clientes/avisoviaje", (req, res) => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    const mockResponse = getMockAvisoDeViaje(token);
    if (!mockResponse.viajes) {
      return res.sendStatus(404);
    }
    return res.status(200).json(mockResponse);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

function getMockAvisoDeViaje(token) {
  L.info("Token recibido para consulta aviso de viaje:", token);
  const mockResponses = {
    unaTarjeta: avisoMocks.avisoDeViajeunaTarjeta,
    variasTarjetas: avisoMocks.avisoDeViajeVariasTarjetas,
    sinTarjetas: avisoMocks.avisoDeViajeSinTarjetas,
  };
  return (mockResponses[token] || avisoMocks.avisoDeViajeunaTarjeta)();
}

app.post("/clientes/avisoviaje", (req, res) => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    const body = req.body;
    L.info("Token recibido para generar aviso de viaje:", token);
    L.info("Datos recibidos:", body);
    return res.status(200).json({ viajeid: "1234" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.delete("/clientes/tarjetas/viajes/avisos/elimina/:id", (req, res) => {
  try {
    const authHeader = req.headers["authorization"] || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Falta el campo 'id' en los params" });
    }

    L.info(
      "Token recibido para eliminar aviso de viaje:",
      token || "[NO RECIBIDO]"
    );
    L.info("ID a eliminar:", id || "[NO RECIBIDO]");

    const mockResponse = avisoMocks.eliminarAvisoDeViaje(id);
    L.info(
      `Mensaje final: ${mockResponse.mensaje} - ID: ${mockResponse.id_eliminado}`
    );

    return res.status(200).json(mockResponse);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.get("/clientes/avisoviaje/tarjetas", (req, res) => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    const mockResponse = getMockTarjetasParaAvisoDeViaje(token);
    return res.status(200).json(mockResponse);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

function getMockTarjetasParaAvisoDeViaje(token) {
  L.info("Token recibido para tarjetas para aviso de viaje:", token);
  const mockResponses = {
    UnaSola: avisoMocks.tarjetasParaAvisoDeViajeUnaSola,
    Varias: avisoMocks.tarjetasParaAvisoDeViajeVarias,
    Ninguna: avisoMocks.tarjetasParaAvisoDeViajeNinguna,
    Diez: avisoMocks.tarjetasParaAvisoDeViajeDiez,
  };
  return (mockResponses[token] || avisoMocks.tarjetasParaAvisoDeViajeUnaSola)();
}

// ------------------------- Reintentos (contador en memoria) -------------------------
let counter = 0;
app.post("/reintentos", (req, res) => {
  counter += 1;
  L.info(`Received request #${counter}`);
  if (counter <= 2) {
    L.info(`Responding with 500 for request #${counter}`);
    return res.status(500).json({
      message: "Internal Server Error - Service temporarily unavailable",
      attempt: counter,
    });
  }
  // reset
  counter = 0;
  L.info(`Responding with 200 for request #3`);
  return res.status(200).json({
    message: "OK - Service is now available",
    attempt: 3,
  });
});

// ------------------------- Enrolamiento -------------------------
app.get("/clientes/:hashCliente/enrolamiento", (req, res) => {
  const { hashCliente } = req.params;
  const modulo = req.query.modulo;
  L.info("Modulo", modulo);
  const hash =
    "Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1RUjA1MlltNVNiR1ZJVVN0UVNGSndZbGRXVkdSSFJuUmpSRFI0VG5wTmVrNUVTVEZQUkdzd1VFTTVNR0ZYTVd4Vk0xSm9ZbGhCSzFCSVRteGpNMDV3WWpJMEsxbHFUVEpOUjFacFRsUkJkRTV0VFhsTmVUQXdXVEpKZWt4VWJHcFBWMGwwVFVSWk5GcHFWbXBQVkZFMVdWUkZNVkJET1hwYVdFNTZZVmM1ZFZCcWQzWlpNamwxWkVkV05HUkVORGhaTW5od1dsYzFNRkJxZUVSaU1sSndXakk1U2xwSFZuVmtSMnh0WVZkT2FGa3liSFppYWpSM1RWUjNkbEV5T1d0aFYyUjJVMWRTYkdKdVVuQmFiV3hxV1ZkT2NHSXlOQ3RRUlRVeFlsZFdlV0l3Ykd0YVZ6VXdZVmRhY0ZreVJtcGhWemwxVUdwUk0wMVVWWGxOZWxVeVVFTTVUMlJYTVd4amJUbEtXa2RXZFdSSGJHMWhWMDVvV1RKc2RtSnFORGhSTWpscllWZGtkbFV5VmpSaWVqVk9VRU01UkdJeVVuQmFNamxVV2xob2RsQnFlRVJpTWxKd1dqSTVWV050Ykdsa1dGSm9ZMjFzZGxCcVFUUlFRemxFWWpKU2NGb3lPVlZqYld4cFpGaFNhR050YkhaUWFuaFBaRmN4YkdOdE9WVmpiV3hwWkZoU2FHTnRiSFpRYWtsNlRrUmplRTVVU1hwT1ZGazFVRU01VDJSWE1XeGpiVGxWWTIxc2FXUllVbWhqYld4MlVHcDRUMkl5TVdsamJWVXJVakJXVTFRd05VcFVWVGhuVVZWc1QxQkRPVTlpTWpGcFkyMVZLMUJGUm5kYVYzaHpZVmRTZGxCclNsQldSbEpHVldwM2RsRllRbXhpUjNod1drYzRLMUJGV214Wk1taG9WRzFHYW1GWE1YQmFWelV3WW5vMGVVMUVRVEpNVkVGNFRGUkpNMUJET1VkYVYwNXZXVlUxYUZreWJIUmhWMVoxWkVjNEsxQkRPV3BpUjJ4c1ltNVJLMUJET1c5WldFNXZVR2M5UFEuOWFnV2lQcmJ3RUctMFpmTjBqMkxsNFV1TzkzNThZR0hvdHd3T1duaGZQYmlQTlFxN3d4WDFmdVA5NDZFZ0RvaDI5QlI4S0NnYVZYU01maEhaQ0QyWXc=";
  const response = hashCliente === hash ? 1 : 0;
  return res.status(200).json({ enroladobiometria: response });
});

// ------------------------- Desvinculación teléfono -------------------------
app.delete("/clientes/:hashCliente/desvincula/telefono", (req, res) => {
  try {
    const { hashCliente } = req.params;
    const authHeader = req.headers["authorization"] || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    L.info("Token recibido para desvinculación:", token || "[NO RECIBIDO]");
    L.info("HashCliente:", hashCliente || "[NO RECIBIDO]");

    switch (token) {
      case "desvincularOK":
        return res.status(204).send();
      case "error401":
        return res.status(401).json(desvinculacionMocks.error401());
      case "error409":
        return res.status(409).json(desvinculacionMocks.error409());
      case "error500":
        return res.status(500).json(desvinculacionMocks.error500());
      default:
        L.warn("Token no reconocido. Enviando error 401 por defecto.");
        return res.status(401).json(desvinculacionMocks.error401());
    }
  } catch (e) {
    L.error("Excepción no controlada:", e);
    return res.status(500).json({ error: e.message });
  }
});

// ------------------------- Catch POST (state) -------------------------
app.post("/:state", (req, res) => {
  L.info(`Received /:state request`);
  return res.status(409).json({
    success: false,
    data: null,
    error: {
      code_http: 409,
      code_info: "DNI_REPETIDO",
      message: "Numero de documento duplicado.",
    },
  });
});

// ------------------------- MULC autorizado -------------------------
app.get("/clientes/dolarmep/autorizado", (req, res) => {
  const authHeader = req.headers["authorization"] || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error_code: "Unauthorized",
      message: "Token no proporcionado o formato inválido.",
    });
  }
  const tokenBiometrico = authHeader.replace("Bearer ", "");
  const autorizado = get_isTokenAutorizado(tokenBiometrico);
  return res.status(200).json({ autorizado });
});

function get_isTokenAutorizado(token) {
  const list = {
    tokenValido1: "true",
    tokenValido2: "false",
    tokenValido3: "true",
    tokenValido4: "true",
  };
  return Object.prototype.hasOwnProperty.call(list, token)
    ? list[token]
    : "false";
}

// ------------------------- Mocks de error -------------------------
app.post("/test-api/500", (req, res) => res.status(500).end());
app.get("/test-api/500", (req, res) => res.status(500).end());
app.post("/test-api/403", (req, res) => res.status(403).end());
app.get("/test-api/403", (req, res) => res.status(403).end());

// ------------------------- Server (Cloud Run / local) -------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// Cloud Functions (si algún día lo usás)
// const functions = require('@google-cloud/functions-framework');
// functions.http('mockService', app);

// ------------------------- ONB -------------------------
app.post("/clientes/altacliente", (req, res) => {
  const mockScenario = req.header("X-Mock-Scenario");
  const body = req.body;

  L.debug("body", body);
  L.info(`Mock Scenario: ${mockScenario}`);

  if (!body) return res.status(400).json({ error: "sin body" });

  if (mockScenario && altaClienteMocks.altaCliente[mockScenario]) {
    const [status, payload] = altaClienteMocks.altaCliente[mockScenario];
    return res.status(status).json(payload);
  }

  return res.status(200).json({ ente: "55555" });
});

app.post("/clientes/apertura/cuentaindividuo", (req, res) => {
  const {
    ente,
    tipo_producto,
    oficina,
    direccion_envio_resumen,
    direccion_envio_tarjeta,
    direccion_email_resumen,
  } = req.body;

  L.info("/clientes/apertura/cuentaindividuo");
  L.debug("body", req.body);

  if (
    ente == null ||
    tipo_producto == null ||
    oficina == null ||
    direccion_envio_resumen == null ||
    direccion_envio_tarjeta == null ||
    !direccion_email_resumen ||
    !String(direccion_email_resumen).trim()
  ) {
    return res.status(400).json({
      success: false,
      error: {
        code_http: 400,
        message: "Solicitud incorrecta, falta algún parámetro obligatorio",
      },
    });
  }

  const error = altaClienteMocks.cuentaIndividuo[oficina];
  if (error) {
    const [status, payload] = error;
    return res.status(status).json(payload);
  }

  if (utils.compareStrings(oficina, "999")) {
    return res.status(200).json(altaClienteMocks.respuestasExito.cuentaARSyUSD);
  }
  if (utils.compareStrings(oficina, "123456")) {
    return res.status(200).json(altaClienteMocks.respuestasExito.cuentaUSD);
  }

  return res.status(200).json(altaClienteMocks.respuestasExito.cuentaARS);
});
