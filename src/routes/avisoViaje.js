// ==========================================================================
//                          MOCKS CONSULTA AVISO DE VIAJE
// ==========================================================================

// Caso 1: Una sola tarjeta
function avisoDeViajeunaTarjeta() {
    return [
        {
            id: "555888222",
            fecha_comienzo: "2024-07-05",
            fecha_fin: "2024-07-12",
            estado: "ACTIVE",
            paises: [
                {
                    codigo: "AL",
                    descripcion: "ALBANIA"
                }
            ],
            informacion_completa: true,
            informacion_completa_descripcion: "At least one card was not included, because it belongs to a bank not included in the bank_code list",
            tarjetas: [
                {
                    ultimos_cuatro_digitos: "3322",
                    categoria: "3",
                    marca: "VI-IN"
                }
            ]
        }
    ];
}


// Caso 2: Varias tarjetas
function avisoDeViajeVariasTarjetas() {
    return [
        {
            id: "132853186",
            fecha_comienzo: "2022-04-19",
            fecha_fin: "2022-04-25",
            estado: "ACTIVE",
            paises: [
                {
                    codigo: "AF",
                    descripcion: "AFGANISTAN"
                }
            ],
            informacion_completa: false,
            informacion_completa_descripcion: "At least one card was not included, because it belongs to a bank not included in the bank_code list",
            tarjetas: [
                {
                    ultimos_cuatro_digitos: "0675",
                    categoria: "7",
                    marca: "VI-CR"
                }
            ]
        },
        {
            id: "984521379",
            fecha_comienzo: "2023-03-10",
            fecha_fin: "2023-03-17",
            estado: "INACTIVE",
            paises: [
                {
                    codigo: "BR",
                    descripcion: "BRASIL"
                }
            ],
            informacion_completa: true,
            informacion_completa_descripcion: "At least one card was not included, because it belongs to a bank not included in the bank_code list",
            tarjetas: [
                {
                    ultimos_cuatro_digitos: "1234",
                    categoria: "2",
                    marca: "MC-PL"
                }
            ]
        },
        {
            id: "736251984",
            fecha_comienzo: "2024-11-01",
            fecha_fin: "2024-11-07",
            estado: "PENDING",
            paises: [
                {
                    codigo: "AR",
                    descripcion: "ARGENTINA"
                },
                {
                    codigo: "AL",
                    descripcion: "ALBANIA"
                }
            ],
            informacion_completa: false,
            informacion_completa_descripcion: "At least one card was not included, because it belongs to a bank not included in the bank_code list",
            tarjetas: [
                {
                    ultimos_cuatro_digitos: "7890",
                    categoria: "5",
                    marca: "AX-GO"
                },
                {
                    ultimos_cuatro_digitos: "4567",
                    categoria: "1",
                    marca: "VI-EL"
                }
            ]
        }
    ];
}


// Caso 3: Sin tarjetas
function avisoDeViajeSinTarjetas() {
    return [
        {
            id: "444777111",
            fecha_comienzo: "2025-01-15",
            fecha_fin: "2025-01-22",
            estado: "CANCELLED",
            paises: [
                {
                    codigo: "AL",
                    descripcion: "ALBANIA"
                }
            ],
            informacion_completa: false,
            informacion_completa_descripcion: "At least one card was not included, because it belongs to a bank not included in the bank_code list",
            tarjetas: []
        }
    ];
}

// ==========================================================================
//                          MOCKS GENERAR AVISO DE VIAJE
// ==========================================================================
// Objetos de ejemplo para realizar pruebas POST

// // Primer objeto de ejemplo
const ejemplo1 = {
    "email": "nuevoemail@ejemplo.com",
    "telefono": "5491122334455",
    "tarjetas": [
      {
        "hash_tarjeta_viaje": "xyz987ABC456"
      }
    ],
    "fecha_inicio": "2025-06-01",
    "fecha_fin": "2025-06-15",
    "paises": [
      {
        "codigo": "AR",
        "descripcion": "ARGENTINA"
      },
      {
        "codigo": "CL",
        "descripcion": "CHILE"
      }
    ]
  };
  
//   // Segundo objeto de ejemplo
  const ejemplo2 = {
    "email": "testuser@ejemplo.com",
    "telefono": "5491133445566",
    "tarjetas": [
      {
        "hash_tarjeta_viaje": "abc123XYZ789"
      }
    ],
    "fecha_inicio": "2025-05-10",
    "fecha_fin": "2025-05-20",
    "paises": [
      {
        "codigo": "BR",
        "descripcion": "BRASIL"
      },
      {
        "codigo": "UY",
        "descripcion": "URUGUAY"
      }
    ]
  };
