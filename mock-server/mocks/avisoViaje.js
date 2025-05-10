// ==========================================================================
//                          MOCKS CONSULTA AVISO DE VIAJE
// ==========================================================================

// Caso 1: Una sola tarjeta
function avisoDeViajeunaTarjeta() {
    return {
        viajes: [
            {
                id: '555888222',
                fecha_comienzo: '2024-07-05',
                fecha_fin: '2024-07-12',
                estado: 'ACTIVE',
                paises: [
                    {
                        codigo: 'AL',
                        descripcion: 'ALBANIA',
                    },
                ],
                informacion_completa: true,
                informacion_completa_descripcion: 'At least one card was not included, because it belongs to a bank not included in the bank_code list',
                tarjetas: [
                    {
                        ultimos_cuatro_digitos: '3322',
                        categoria: '3',
                        marca: 'VI-IN',
                    },
                ],
            },
        ],
    };
}


// Caso 2: Varias tarjetas
function avisoDeViajeVariasTarjetas() {
    return {
        viajes: [
            {
                id: '132853186',
                fecha_comienzo: '2022-04-19',
                fecha_fin: '2022-04-25',
                estado: 'ACTIVE',
                paises: [
                    {
                        codigo: 'AF',
                        descripcion: 'AFGANISTAN',
                    },
                ],
                informacion_completa: false,
                informacion_completa_descripcion: 'At least one card was not included, because it belongs to a bank not included in the bank_code list',
                tarjetas: [
                    {
                        ultimos_cuatro_digitos: '0675',
                        categoria: '7',
                        marca: 'VI-CR',
                    },
                ],
            },
            {
                id: '984521379',
                fecha_comienzo: '2023-03-10',
                fecha_fin: '2023-03-17',
                estado: 'INACTIVE',
                paises: [
                    {
                        codigo: 'BR',
                        descripcion: 'BRASIL',
                    },
                ],
                informacion_completa: true,
                informacion_completa_descripcion: 'At least one card was not included, because it belongs to a bank not included in the bank_code list',
                tarjetas: [
                    {
                        ultimos_cuatro_digitos: '1234',
                        categoria: '2',
                        marca: 'MC-PL',
                    },
                ],
            },
            {
                id: '736251984',
                fecha_comienzo: '2024-11-01',
                fecha_fin: '2024-11-07',
                estado: 'PENDING',
                paises: [
                    {
                        codigo: 'AR',
                        descripcion: 'ARGENTINA',
                    },
                    {
                        codigo: 'AL',
                        descripcion: 'ALBANIA',
                    },
                ],
                informacion_completa: false,
                informacion_completa_descripcion: 'At least one card was not included, because it belongs to a bank not included in the bank_code list',
                tarjetas: [
                    {
                        ultimos_cuatro_digitos: '7890',
                        categoria: '5',
                        marca: 'AX-GO',
                    },
                    {
                        ultimos_cuatro_digitos: '4567',
                        categoria: '1',
                        marca: 'VI-EL',
                    },
                ],
            },
        ],
    };
}

// Caso 3: Sin tarjetas
function avisoDeViajeSinTarjetas() {
    return {
        viajes: [
            {
                id: '444777111',
                fecha_comienzo: '2025-01-15',
                fecha_fin: '2025-01-22',
                estado: 'CANCELLED',
                paises: [
                    {
                        codigo: 'AL',
                        descripcion: 'ALBANIA',
                    },
                ],
                informacion_completa: false,
                informacion_completa_descripcion: 'At least one card was not included, because it belongs to a bank not included in the bank_code list',
                tarjetas: [],
            },
        ],
    };
}
