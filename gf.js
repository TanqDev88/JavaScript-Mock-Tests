  //****************************************** UTILS FLUJO AVISO DE VIAJE **************************************************/
  function T_Intro_AVJE_preProccesMessage() {
    setCallbackConfig('avisoViaje');
    reset_vars_AVJE();
}

function reset_vars_AVJE() {
    reset_tarjetas_AVJE(); 
    setBuildMenuPrimeraVez(true); 
}

function T_check_estado_prev_avje() {
    var tarjetasAVJE = botContext.getBotVariable('tarjetasAVJE');
    var fechaInicioAVJE = botContext.getBotVariable('fechaInicioAVJE');
    var fechaFinAVJE = botContext.getBotVariable('fechaFinAVJE');
    var paisesAVJE = botContext.getBotVariable('paisesAVJE');
    var emailUsuario = botContext.getBotVariable('emailUsuario');

    if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE) && !isEmpty(fechaFinAVJE) && !isEmpty(paisesAVJE) && !isEmpty(emailUsuario)) {
        goToDialog('Datos previa');
    } else if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE) && !isEmpty(fechaFinAVJE) && !isEmpty(paisesAVJE)) {
        goToDialog('Tarj + F.I. + F.F. + países previa');
    } else if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE) && !isEmpty(fechaFinAVJE)) {
        goToDialog('Tarj + F.I. + F.F. previa');
    } else if (!isEmpty(tarjetasAVJE) && !isEmpty(fechaInicioAVJE)) {
        goToDialog('Tarj + Fecha inicio previa');
    } else if (!isEmpty(tarjetasAVJE)) {
        goToDialog('Selección tarjetas previa');
    } else {
        goToDialog('Intro');
    }
}