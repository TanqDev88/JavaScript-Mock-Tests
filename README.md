



<h1 align="center"># 🧪 Mock Server para pruebas de servicios</h1>
<p align="center">Este proyecto permite levantar un servidor local con diferentes endpoints mockeados para pruebas de integración y desarrollo, utilizando **Node.js + Express**.</p>

---

## 🚀 Technologies and Tools
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
</p>

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
