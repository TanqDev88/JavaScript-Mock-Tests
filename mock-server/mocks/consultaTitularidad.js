function buildMockResponse(token, queryParams) {
  var data = {};
  switch (String(token)) {
    case "200":
      if (queryParams.alias.includes("bodegon.aristeo")) {
        data = {
          statusCode: 412,
          body: { error_code: "0190", message: "El Alias no existe." },
        };
        break;
      }
      data = {
        statusCode: 200,
        body: {
          cuenta_destino_moneda_codigo: "80",
          cuenta_destino_moneda_descripcion: "$",
          cuenta_destino_numero: "320009419410446",
          cuenta_destino_alias: "Alias Test",
          cuenta_destino_numeroCBU: "2850200930094194104461",
          cuenta_destino_tipo_codigo: "3",
          cuenta_destino_tipo_descripcion: "CC",
          cuits: ["30717506673"],
          banco_codigo: "BMBS",
          banco_nombre: "BANCO MACRO",
          titular_nombre: "BLOCKCHAIN PAYMENT RAILS",
        },
      };
      break;
    case "201":
      data = {
        statusCode: 200,
        body: {
          cuenta_destino_moneda_codigo: "80",
          cuenta_destino_moneda_descripcion: "$",
          cuenta_destino_numero: "320009419410446",
          cuenta_destino_alias: "Alias Test",
          cuenta_destino_numeroCBU: "2850200930094194104461",
          cuenta_destino_tipo_codigo: "3",
          cuenta_destino_tipo_descripcion: "CC",
          cuits: ["30717506673"],
          banco_codigo: "BMBS",
          banco_nombre: "BANCO MACRO",
          titular_nombre: "BLOCKCHAIN PAYMENT RAILS",
        },
      };
      break;
    case "400":
      data = { statusCode: 400, body: {} };
      break;
    case "404":
      data = { statusCode: 404, body: {} };
      break;
    case "412-61":
      data = {
        statusCode: 412,
        body: {
          error_code: "61",
          message: "Llegaste al límite diario de operaciones",
        },
      };
      break;
    case "412-36":
      data = {
        statusCode: 412,
        body: { error_code: "36", message: "La CBU ingresada es inválida." },
      };
      break;
    case "412-68":
      data = {
        statusCode: 412,
        body: { error_code: "68", message: "El Alias no existe." },
      };
      break;
    case "412-70":
      data = {
        statusCode: 412,
        body: {
          error_code: "70",
          message: "Error de sistema (intente repetir la operación).",
        },
      };
      break;
    case "412-0190":
      data = {
        statusCode: 412,
        body: { error_code: "0190", message: "El Alias no existe." },
      };
      break;
    case "412-57":
      data = { statusCode: 412, body: { error_code: "57", message: "57" } };
      break;
    case "412-65":
      data = { statusCode: 412, body: { error_code: "65", message: "65" } };
      break;
    case "412-B66":
      data = { statusCode: 412, body: { error_code: "B66", message: "B66" } };
      break;
    case "412-B70":
      data = { statusCode: 412, body: { error_code: "B70", message: "B70" } };
      break;
    case "412-B72":
      data = { statusCode: 412, body: { error_code: "B72", message: "B72" } };
      break;
    case "412-50":
      data = { statusCode: 412, body: { error_code: "50", message: "50" } };
      break;
    case "999":
      data = { statusCode: 412, body: { error_code: "999", message: "999" } };
      break;
    case "412-1060":
      data = {
        statusCode: 412,
        body: { error_code: "0160", message: "Cuenta inactiva" },
      };
      break;
    case "412-B76":
      data = {
        statusCode: 412,
        body: { error_code: "B76", message: "CBU inhabilitado o inválido" },
      };
      break;
    case "412-prisma-empty-details":
      data = {
        success: false,
        data: null,
        error: {
          code_http: 412,
          details: "",
          message: "Error prisma al consultar titularidad",
          code_info: "ERROR_PRISMA",
        },
      };
      break;
    default:
      data = {
        statusCode: 500,
        body: { error_code: "9999", message: "error inesperado" },
      };
      break;
  }
  return data;
}
module.exports = { buildMockResponse };
