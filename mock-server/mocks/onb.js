// ========================================================================================
//             CASOS DE ERROR/EXITO SERVICIOS ALTA CLIENTE & CUENTA INDIVIDUO
// ========================================================================================

// Simulaciones de respuestas de los servicios de apertura de cuenta (ONB). 
// (casos de error y de éxito para los servicios `altaCliente` y `cuentaIndividuo`).

module.exports = {
    altaCliente: {
        // Error de autenticación (token inválido o expirado)
        '401': [401, { error_code: 'SecurityException', message: 'La información de seguridad no es válida' }],
        
        //Cliente (caso duplicado)
        '412': [412, { error_code: '101061', message: '[sp_ente] NUMERO DE IDENTIFICACION TRIBUTARIA DUPLICADA' }],
        
        // Errores genéricos en la creación del cliente
        '103001': [412, { error_code: '103001', message: 'Tenemos inconvenientes en el servicio' }],
        '103005': [412, { error_code: '103005', message: 'Tenemos inconvenientes en el servicio' }],
        '101001': [412, { error_code: '101001', message: 'Tenemos inconvenientes en el servicio' }],
        
        // DNI inhabilitado.
        '107215': [412, { error_code: '107215', message: 'inhabilitación de DNI' }],
        
        // Dirección de email repetido.
        '107526': [412, { error_code: '107526', message: 'mail repetido' }],
        
        // Error en sucursal
        '701102': [412, { error_code: '701102', message: 'error en sucursal' }],
        
        // Error inesperado del servidor
        '500': [500, { error_code: 'ServiceException', message: 'Error interno, por favor vuelva a intentar.' }],
    },

    cuentaIndividuo: {
        // Error de autenticación (token inválido o expirado)
        '401': [401, {
            error_code: 'SecurityException',
            message: 'La información de seguridad no es válida',
        }],
        
        // Límite máximo de cuentas alcanzado para el cliente
        '258264': [412, {
            error_code: '258264',
            message: 'SE SUPERO LA CANTIDAD MAXIMA DE CUENTAS PARA EL CLIENTE',
        }],
        
        // Ente no existente o cedula incorrecta.
        '101042': [412, {
            error_code: '101042',
            message: 'NO EXISTE ENTE O CEDULA INCORRECTA',
        }],
        
        // Oficial de cuenta no disponible.
        '258235': [412, {
            error_code: '258235',
            message: 'EL OFICIAL DE CUENTA NO SE ENCUENTRA PARA LA SUCURSAL O NO ESTA VIGENTE',
        }],
        
        // Apertura de cuenta denegada (ir a sucursal).
        '258266': [412, {
            error_code: '258266',
            message: 'No pudimos abrir tu Caja de Ahorro por este canal. Por favor, acercate a una sucursal',
        }],
        
        // Error 500
        '500': [500, {
            error_code: 'ServiceException',
            message: 'Error interno, por favor vuelva a intentar.',
        }],
    },

    respuestasExito: {
        // cuenta abierta exitosamente en USD
        cuentaUSD: {
            cuenta_banco: '470309582121183',
            cbu: '2850703540095821211838',
            estado: 'A',
            categoria: 'USD',
            oficial: 232321,
            producto_bancario: 21,
        },

        // Cuenta abierta exitosamente en ARS
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

