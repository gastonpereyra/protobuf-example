# Protobuf Example

Ejemplo para usar Protocol Buffers en Node.js

## Uso simple

1. Instalar depedencias `npm i`
2. Generar Archivo de ejemplo `npm run generate-file`, esto crea el archivo `encoded/examplesEncoded.proto`, a partir de los datos en `dataset/examples.json`
3. Leer Archivo de ejemplo `npm run decode-file`, lee archivo anterior y por consola muestra los datos guardados

## Uso más complejo

### Modificar Archivo de Ejemplo

* En `protobuf/definitions/examples.proto` esta la estructura de datos para el Protocol Buffer, se puede modificar para probar otras definiciones
* En `dataset/examples.json` estan los datos de pruebas, que tambíen se pueden cambiar para probar variantes.

### Crear otra definición

* Se puede extender la lib base de protobuf, para usar otra definición, tomar de ejemplo `protobuf/examples.js`, solo hace falta settear algunas cosas, el nombre del archivo es importante, digamos `sarasa.js`
* El set de datos debe estar en `dataset/` y debe tener el mismo nombre del archivo extendido de la lib de protobuf, por ejemplo `dataset/sarasa.json`
* Para generar el archivo basta con correr `npm run generate-file sarasa`, y genera el archivo en `encoded/sarasaEncoded.proto`
* Para leer, `npm run decode-file sarasa`

## Uso con datos random y cantidad variante

En la carpeta `generator/` se pueden crear generadores de datos donde la cantidad (y los datos mismos) pueden variar, este archivo debe exportar una función que reciba el dato `size` (para el tamaño del dataset), y devolver el set de datos.

Existe una entidad `perfomance` donde usa la misma estructura de datos que `example` pero se generan en diferentes cantidades (obviamente) y varia el contenido en cada ejecución.

Para ejecutar la generación de archivos:

* `npm run generate-file [entidad] [cantidad]`
* genera el archivo encodeado en `encoded/[entidad].proto`
* genera el dataset usado en `dataset/[entidad].json`

Ejemplo `npm run generate-file perfomance 100000`

## Conclusión

Todo muy lindo.

Esto se realizo usando

* [protobuf.js](https://www.npmjs.com/package/protobufjs)
* [lllog](https://www.npmjs.com/package/lllog)

Se hizo para el team de [Janis-commerce](https://github.com/janis-commerce)

