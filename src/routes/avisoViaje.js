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