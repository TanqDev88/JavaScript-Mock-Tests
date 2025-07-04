module.exports = {
    error401: () => ({
        error_code: 'SecurityException',
        message: 'La información de seguridad no es válida',
    }),
    error409: () => ({
        error_code: '76015',
        message: 'El usuario no posee números telefónicos a desvincular',
    }),
    error500: () => ({
        error_code: 'ServiceException',
        message: 'Error interno, por favor vuelva a intentar.',
    }),
};


