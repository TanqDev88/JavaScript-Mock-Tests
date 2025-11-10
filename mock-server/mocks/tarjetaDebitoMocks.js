//****************************************Transacciones I************ Mocks TD's***********************
// Estos mocks simulan distintas respuestas posibles de tarjetas de débito (VISA/MASTERCARD) según su estado y motivo, para probar escenarios de blanqueo de PIN y desbloqueo TD.
// La función obtenerMockPorToken(token) devuelve el mock correspondiente según el token recibido.
function BLANQUEO_PIN_ACTIVA() {
  return {
    tarjetas: [
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "4321",
        miembro: "T",
        estado: "A", // ✅ Activa
        motivo: null,
        hash: "HASH_ACTIVA_001",
      },
    ],
  };
}

function BLANQUEO_PIN_WTDR() {
  return {
    tarjetas: [
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "9876",
        miembro: "T",
        estado: "W", // ⚠️ Bloqueada
        motivo: "TDR", // ✅ Motivo TDR
        hash: "HASH_WTDR_002",
      },
    ],
  };
}

function DESBLOQUEO_TD_WSUS() {
  return {
    tarjetas: [
      {
        marca: "MASTERCARD",
        tipo: "DEBITO",
        numero: "1111",
        miembro: "T",
        estado: "W", // ⚠️ Bloqueada
        motivo: "SUS",
        hash: "HASH_WSUS_003",
      },
    ],
  };
}

function DESBLOQUEO_TD_WOTRO() {
  return {
    tarjetas: [
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "2222",
        miembro: "T",
        estado: "W",
        motivo: "OTRO",
        hash: "HASH_WOTRO_004",
      },
    ],
  };
}

function DESBLOQUEO_TD_YA_DESBLOQUEADA() {
  return {
    tarjetas: [
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "3333",
        miembro: "T",
        estado: "A", // ✅ Ya activa
        motivo: null,
        hash: "HASH_ACTIVA_005",
      },
    ],
  };
}

function BLANQUEO_PIN_AADA_REAL() {
  return {
    tarjetas: [
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "5208",
        miembro: "T",
        estado: "A",
        motivo: "ADA",
        hash: "HASH_AADA_5208",
      },
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "7007",
        miembro: "T",
        estado: "A",
        motivo: "ADA",
        hash: "HASH_AADA_7007",
      },
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "2295",
        miembro: "T",
        estado: "G",
        motivo: "REP",
        hash: "HASH_GREP_2295",
      },
      {
        marca: "VISA",
        tipo: "DEBITO",
        numero: "1558",
        miembro: "T",
        estado: "G",
        motivo: "REP",
        hash: "HASH_GREP_1558",
      },
    ],
  };
}

// 🔹 Manejador genérico (similar al resto de mocks)
function obtenerMockPorToken(token) {
  switch (token) {
    case "BLANQUEO_PIN_ACTIVA":
      return BLANQUEO_PIN_ACTIVA();
    case "BLANQUEO_PIN_WTDR":
      return BLANQUEO_PIN_WTDR();
    case "DESBLOQUEO_TD_WSUS":
      return DESBLOQUEO_TD_WSUS();
    case "DESBLOQUEO_TD_WOTRO":
      return DESBLOQUEO_TD_WOTRO();
    case "DESBLOQUEO_TD_YA_DESBLOQUEADA":
      return DESBLOQUEO_TD_YA_DESBLOQUEADA();
    case "BLANQUEO_PIN_AADA_REAL":
      return BLANQUEO_PIN_AADA_REAL();
    default:
      return { error: "Token no reconocido" };
  }
}

module.exports = {
  BLANQUEO_PIN_ACTIVA,
  BLANQUEO_PIN_WTDR,
  DESBLOQUEO_TD_WSUS,
  DESBLOQUEO_TD_WOTRO,
  DESBLOQUEO_TD_YA_DESBLOQUEADA,
  obtenerMockPorToken,
};
