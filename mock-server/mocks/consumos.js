function consumosTarjeta(token) {
    let consumos = {};

    switch (token) {
        case 'consumosLargo':
            consumos = {
                consumos: [
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-12-03 00:00:00',
                        numero_cupon: '165000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-00200000000000000000000000000000000000000000000000000000',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-11-11 00:00:00',
                        numero_cupon: '164000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-00200200000000000000000000000000000000000000000000000000000',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-11-10 00:00:00',
                        numero_cupon: '163000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-00200200000000000000000000000000000000000000000000000000000',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-11-10 00:00:00',
                        numero_cupon: '162000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-002',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-12-03 00:00:00',
                        numero_cupon: '161000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-002',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-11-11 00:00:00',
                        numero_cupon: '154000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-002',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-11-10 00:00:00',
                        numero_cupon: '143000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-002',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                    {
                        numero_tarjeta: '0578',
                        moneda_banco_macro: '1',
                        fecha_cupon: '2025-11-10 00:00:00',
                        numero_cupon: '122000',
                        importe: 21276.26,
                        cantidad_cuotas: '1',
                        fecha_cierre_tarjeta_credito: '2024-12-20 00:00:00',
                        comercio: 'GALENO SEGUROS0000517685676-004-002',
                        importe_cuota: 21276.26,
                        plan: '1',
                    },
                ],
            };
            break;
    }
    return consumos;
}

module.exports = { consumosTarjeta };