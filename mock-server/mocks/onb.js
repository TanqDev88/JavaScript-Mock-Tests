// mocks/ONB.js

module.exports = {
    altaCliente: {
        '401': [401, { error_code: 'Error de autenticación', message: 'mensaje' }],
        '412': [412, { error_code: '101061', message: 'duplicado' }],
        '103001': [412, { error_code: '103001', message: 'error en la creación del cliente' }],
        '103005': [412, { error_code: '103005', message: 'error en la creación del cliente' }],
        '101001': [412, { error_code: '101001', message: 'error en la creación del cliente' }],
        '107215': [412, { error_code: '107215', message: 'inhabilitación de DNI' }],
        '107526': [412, { error_code: '107526', message: 'mail repetido' }],
        '701102': [412, { error_code: '701102', message: 'error en sucursal' }],
        '500': [500, { error_code: 'service exception', message: 'error inesperado' }],
    },
    cuentaIndividuo: {
        '401': [401, {
            error_code: 'SecurityException',
            message: 'La información de seguridad no es válida',
        }],
        '258264': [412, {
            error_code: '258264',
            message: 'SE SUPERO LA CANTIDAD MAXIMA DE CUENTAS PARA EL CLIENTE',
        }],
        '101042': [412, {
            error_code: '101042',
            message: 'NO EXISTE ENTE O CEDULA INCORRECTA',
        }],
        '258235': [412, {
            error_code: '258235',
            message: 'EL OFICIAL DE CUENTA NO SE ENCUENTRA PARA LA SUCURSAL O NO ESTA VIGENTE',
        }],
        '258266': [412, {
            error_code: '258266',
            message: 'No pudimos abrir tu Caja de Ahorro por este canal. Por favor, acercate a una sucursal',
        }],
        '500': [500, {
            error_code: 'ServiceException',
            message: 'Error interno, por favor vuelva a intentar.',
        }],
    },
    respuestasExito: {
        cuentaUSD: {
            cuenta_banco: '470309582121183',
            cbu: '2850703540095821211838',
            estado: 'A',
            categoria: 'USD',
            oficial: 232321,
            producto_bancario: 21,
        },
        cuentaARS: {
            cuenta_banco: '470309582121183',
            cbu: '2850703540095821211838',
            estado: 'A',
            categoria: 'K',
            oficial: 232321,
            producto_bancario: 21,
        },
    }
};
