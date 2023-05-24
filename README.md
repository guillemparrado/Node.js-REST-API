
# Node.js REST API Fundamentals

## Enunciats

### 1.1

Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i l'URL des d'on es fa la petició.

### 1.2

Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif amb una petició POST i que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.

### 2.1

Crea un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari/ària i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, sigui mitjançant Express o mitjançant un altre middleware.

### 2.2

Afegeix un middleware a l'endpoint anterior que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).


## Instruccions

Per importar col·lecció Postman:
1. Obrir Postman -> Collections -> Import -> seleccionar `postman_requests/Entrega4.1.postman_collection.json`

Per arrencar l'API només caldrà instal·lar dependències amb `npm i` i arrencar-la amb `npm start`.

Els endpoints de l'API són:
- GET /user: retorna usuari Guillem, l'edat i la url des d'on es fa el request
- POST /upload: permet pujar des d'un form un arxiu d'imatge que tingui extensió png, jpg o gif. Retorna un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.
- POST /time: Necessita autenticació bàsica, rep com a paràmetre un JSON amb el nom d'usuari i retorna un objecte JSON que amb l'hora i data actual. Afegeix a la capçalera 'Cache-control: no-cache' i habilita CORS en les respostes. En cas de no rebre autenticació o un cos JSON amb el nom d'usuari, retorna error 400.

