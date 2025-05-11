📬 Endpoints disponibles
1. Consulta de Piezas

POST http://localhost:8080/piezas

Header obligatorio: Authorization: unaTarjeta

Otros valores válidos: variasTarjetas, estadoIncluidoEnMuchos, etc.

2. Aviso de Viaje

POST http://localhost:8080/aviso-viaje

Header obligatorio: Authorization: viajeConfirmado

Otros valores válidos: viajeRechazado, viajePendiente, etc.