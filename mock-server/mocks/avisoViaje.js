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


// ==========================================================================
//                          MOCKS GENERAR AVISO DE VIAJE (Sin uso)
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

// ==========================================================================
//                          MOCKS TARJETAS PARA AVISO DE VIAJE
// ==========================================================================
function tarjetasParaAvisoDeViajeUnaSola() {
    return {
        Tarjetas: [
            {
                marca: 'VI-CR',
                ultimoscuatrodigitos: '1965',
                categoria: 'E',
                hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1RUjA1MlltNVNiR1ZJVVN0UVNGSndZbGRXVkdSSFJuUmpSRFI0VG5wUk0wOVVSVEpPVkdkNVVFTTVNR0ZYTVd4Vk0xSm9ZbGhCSzFCSVRteGpNMDV3WWpJMEsxcFhXVE5aVjBWM1RWUlpkRnBFVm1wUFF6QXhXVmRTYUV4WFNUTlpNa2wwVGxkV2EwNVVhelJOYlVWNVRXcGplRkJET1hwYVdFNTZZVmM1ZFZCcWQzWlpNamwxWkVkV05HUkVORGhrUjBaNVlXMVdNRmxVTkRoWmJXeDFVR3BSTlUxNlkzaE9la0YzVUVNNWFXRlhOQ3RRU0ZaelpFZFNjRm95YkRCaU0wMHJUVlJyTWs1VWQzWmtWM2d3V2tkc2JtRllVblpqZWpRNFpFZHNNR1JYZUdoamFqVklVMVU1VTFKRlJrOVVlVGxDVkd0RloxUlZSbE5UVlVVNFRETlNjR1JJVm5OWldFa3JVRU01TUZsWVNuRmFXRkpvVUdwM2RtRkhSbnBoUkRROS5IaHY1Mk9aaFZVeGp6MG1iWVE5TzkybzZubWszWTl6enk0SHA1MVRGV3BFRy0ycFdHMG5YTk93SXJ3YUdVZTduSTFqelVLdXBhS0hZNWRTdTBqU0VCUQ==',
            },
        ],
    };
}

function tarjetasParaAvisoDeViajeVarias() {
    return {
        Tarjetas: [
            {
                marca: 'VI-CR',
                ultimoscuatrodigitos: '1965',
                categoria: 'E',
                hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1RUjA1MlltNVNiR1ZJVVN0UVNGSndZbGRXVkdSSFJuUmpSRFI0VG5wUk0wOVVSVEpPVkdkNVVFTTVNR0ZYTVd4Vk0xSm9ZbGhCSzFCSVRteGpNMDV3WWpJMEsxcFhXVE5aVjBWM1RWUlpkRnBFVm1wUFF6QXhXVmRTYUV4WFNUTlpNa2wwVGxkV2EwNVVhelJOYlVWNVRXcGplRkJET1hwYVdFNTZZVmM1ZFZCcWQzWlpNamwxWkVkV05HUkVORGhrUjBaNVlXMVdNRmxVTkRoWmJXeDFVR3BSTlUxNlkzaE9la0YzVUVNNWFXRlhOQ3RRU0ZaelpFZFNjRm95YkRCaU0wMHJUVlJyTWs1VWQzWmtWM2d3V2tkc2JtRllVblpqZWpRNFpFZHNNR1JYZUdoamFqVklVMVU1VTFKRlJrOVVlVGxDVkd0RloxUlZSbE5UVlVVNFRETlNjR1JJVm5OWldFa3JVRU01TUZsWVNuRmFXRkpvVUdwM2RtRkhSbnBoUkRROS5IaHY1Mk9aaFZVeGp6MG1iWVE5TzkybzZubWszWTl6enk0SHA1MVRGV3BFRy0ycFdHMG5YTk93SXJ3YUdVZTduSTFqelVLdXBhS0hZNWRTdTBqU0VCUQ==',
            },
            {
                marca: 'VI-CR',
                ultimoscuatrodigitos: '1955',
                categoria: '0',
                hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1RUjA1MlltNVNiR1ZJVVN0UVNGSndZbGRXVkdSSFJuUmpSRFI0VG5wUk0wOVVSVEpPVkdkNVVFTTVNR0ZYTVd4Vk0xSm9ZbGhCSzFCSVRteGpNMDV3WWpJMEsxcFhXVE5aVjBWM1RWUlpkRnBFVm1wUFF6QXhXVmRTYUV4WFNUTlpNa2wwVGxkV2EwNVVhelJOYlVWNVRXcGplRkJET1hwYVdFNTZZVmM1ZFZCcWQzWlpNamwxWkVkV05HUkVORGhrUjBaNVlXMVdNRmxVTkRoWmJXeDFVR3BSTVU1VVZUVlBWRUYzVUVNNWFXRlhOQ3RRU0ZaelpFZFNjRm95YkRCaU0wMHJUVlJyTVU1VWQzWmtWM2d3V2tkc2JtRllVblpqZWpRNFpFZHNNR1JYZUdoamFqVklVMVU1VTFKRlJrOVVlVGxDVkd0RloxUlZSbE5UVlVVNFRETlNjR1JJVm5OWldFa3JVRU01TUZsWVNuRmFXRkpvVUdwM2RtRkhSbnBoUkRROS41Vm9TeHdMWExHQTlYZGlTVE14eTVTWlU0N3psMmdJcVhUUW9WRkc0QV9obzZIOFp2QWQ2Ty0zQTJ0Q0cwbzBsaE5aWE5PWTZrV2xRYng2Z1RTWGZCZw==',
            },
            {
                marca: 'VI-CR',
                ultimoscuatrodigitos: '4140',
                categoria: '1',
                hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1RUjA1MlltNVNiR1ZJVVN0UVNGSndZbGRXVkdSSFJuUmpSRFI0VG5wUk0wOVVSVEpPVkdkNVVFTTVNR0ZYTVd4Vk0xSm9ZbGhCSzFCSVRteGpNMDV3WWpJMEsxcFhXVE5aVjBWM1RWUlpkRnBFVm1wUFF6QXhXVmRTYUV4WFNUTlpNa2wwVGxkV2EwNVVhelJOYlVWNVRXcGplRkJET1hwYVdFNTZZVmM1ZFZCcWQzWlpNamwxWkVkV05HUkVORGhrUjBaNVlXMVdNRmxVTkRoWmJXeDFVR3BSTVU1VVZUVlBWRUYzVUVNNWFXRlhOQ3RRU0ZaelpFZFNjRm95YkRCaU0wMHJUa1JGTUUxRWQzWmtWM2d3V2tkc2JtRllVblpqZWpRNFpFZHNNR1JYZUdoamFqVklVMVU1VTFKRlJrOVVlVGxDVkd0RloxUlZSbE5UVlVVNFRETlNjR1JJVm5OWldFa3JVRU01TUZsWVNuRmFXRkpvVUdwM2RtRkhSbnBoUkRROS5oOHFvWHFjUGEzN196Tmx3YjI5S2sxY1VQNDIwWS13cEo0cHFUN1J2MmhERmF1bTdDZkM3WUE0LVhQSUFqV2g3eDNVaGI5eS1tLWUtaHZWZXpxQ01TUQ==',
            },
        ],
    };
}

function tarjetasParaAvisoDeViajeNinguna() {
    return {
        Tarjetas: [],
    };
}

function tarjetasParaAvisoDeViajeDiez() {
    return {
        Tarjetas: [
            { marca: 'VI-CR', ultimoscuatrodigitos: '1999', categoria: 'E', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRW' },
            { marca: 'VI-CR', ultimoscuatrodigitos: '1963', categoria: '1', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRW' },
            { marca: 'VI-CR', ultimoscuatrodigitos: '4132', categoria: '0', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRW' },
            { marca: 'VI-CR', ultimoscuatrodigitos: '4140', categoria: '1', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRW' },
            { marca: 'VI-DB', ultimoscuatrodigitos: '9000', categoria: '', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rN' },
            { marca: 'VI-DB', ultimoscuatrodigitos: '6001', categoria: '', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rN' },
            { marca: 'VI-DB', ultimoscuatrodigitos: '6002', categoria: '', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rN' },
            { marca: 'VI-DB', ultimoscuatrodigitos: '6003', categoria: '', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rN' },
            { marca: 'VI-DB', ultimoscuatrodigitos: '6004', categoria: '', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rN' },
            { marca: 'VI-DB', ultimoscuatrodigitos: '9005', categoria: '', hash: 'Mjg1MDAwMDU2RFo3ZElEUFBXaXRLOVF5QXFmK1BoSUYzaU0rNXdCaVoyRWtKb2Zoa2x6bU8rbHZXMXQ0QUhBPT1R' },
        ],
    };
}

// ==========================================================================
//                       EXPORTACIÓN DE FUNCIONES
// ==========================================================================

module.exports = {
    avisoDeViajeunaTarjeta,
    avisoDeViajeVariasTarjetas,
    tarjetasParaAvisoDeViajeUnaSola,
    tarjetasParaAvisoDeViajeVarias,
    tarjetasParaAvisoDeViajeNinguna,
    tarjetasParaAvisoDeViajeDiez,
};
