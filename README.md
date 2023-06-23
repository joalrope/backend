# WebServer + RestServer for QR MENU PR

Recuerden que deben de ejecutar ```yarn``` para reconstruir los módulos de Node.

Las variables de entornos necesarias para ejecutar el proyecto son:

PORT: Numero de puerto donde se levanta el servidor
MONGODB_URI: Cadena de conexion en MongoDB
SECRET_KEY: Clave secreta con la cual se encryptaran claves, password, entre otros mediante bcrypt.

establecer los respectivos valores y renombrar el archivo .example.env a .env

Ejecutar ``` yarn start:dev``` para levantar el servidor.

La api esta documentada con Swagger, para realizar pruebas ir a: http://localhost:[PORT]/api/api-doc


