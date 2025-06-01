# 🧪 Mock Server para pruebas de servicios

Este proyecto permite levantar un servidor local con diferentes endpoints mockeados para pruebas de integración y desarrollo, utilizando **Node.js + Express**.


---

## ▶️ Cómo ejecutar el servidor mock

1. **Cloná el repositorio**:

```bash
git clone https://github.com/tuusuario/javascript-mocktest.git
cd javascript-mocktest/mock-server



## 📁 Estructura del proyecto
📬 Endpoints disponibles
1. Consulta de Piezas

POST http://localhost:8080/piezas

Header obligatorio: Authorization: unaTarjeta

Otros valores válidos: variasTarjetas, estadoIncluidoEnMuchos, etc.

2. Aviso de Viaje

POST http://localhost:8080/aviso-viaje

Header obligatorio: Authorization: viajeConfirmado

Otros valores válidos: viajeRechazado, viajePendiente, etc.

3. Levantar el servidor de manera local para pruebas con postman:
Desde el directorio mock-server ejecutar el comando: node index.js


Notas
No olvides revisar el archivo .gitignore para evitar subir node_modules.

Si querés agregar más mocks, simplemente creá un nuevo archivo dentro de mocks/ y agregá el handler en index.js.
