<h1 align="center">
  <p align="center">🧪 Mock Server para pruebas locales</p>
</h1>

<p align="center">
  Simulador de endpoints REST usando Node.js + Express para testear integraciones.
</p>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Content
* [General information](#general-information)
* [Technologies](#technologies)
* [Installation & usage](#installation)
* [Available endpoints](#endpoints)
* [Postman collection](#postman)

<a name="general-information"></a>
## General information

Este proyecto levanta un servidor mock en local para simular diferentes respuestas de APIs REST. Está pensado para pruebas de desarrollo e integración sin necesidad de servicios reales.

## Project status 🚧
<details>
  <summary>Click Here for Detail ↩️</summary>
  <br>
  <p align="justify">El proyecto está listo para ser utilizado en entornos de desarrollo. Podés ampliarlo fácilmente agregando nuevos mocks. 🚀</p>
</details>
<hr>

<a name="technologies"></a>
## Used technology 💻

<details>
  <summary>Click Here for Detail ↩️</summary>
  <br>
  <ul>
    <li>Node.js: <a href="https://nodejs.org/">Documentación oficial</a></li>
    <li>Express: <a href="https://expressjs.com/es/">Documentación oficial</a></li>
    <li>Postman: <a href="https://www.postman.com/">Sitio oficial</a></li>
    <li>VS Code: <a href="https://code.visualstudio.com/">Editor utilizado</a></li>
  </ul>
</details>
<hr>

<a name="installation"></a>
## Installation & usage 💻

<details>
  <summary>Click Here for Detail ↩️</summary>
  <br>

1 - Cloná el repositorio:



📬 Available Endpoints
1. Consulta de Piezas

POST http://localhost:8080/piezas

Header Required: Authorization: unaTarjeta

Otros valores válidos: variasTarjetas, estadoIncluidoEnMuchos, etc.

2. Aviso de Viaje

POST http://localhost:8080/aviso-viaje

Header Required: Authorization: viajeConfirmado



Other valid values: tripRejected, tripPending, etc.

Notes
Don't forget to check the .gitignore file to avoid uploading node_modules.

If you want to add more mocks, simply create a new file inside mocks/ and add the handler to index.js.
