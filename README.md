# Test Práctico de Mercado Libre

## Comandos

En el directorio del proyecto corra el siguiente comando para iniciar la aplicacion.

### `npm start`

Para iniciar el proyecto en un container de Docker

` docker build --tag meli-test . ` 

` docker run -p 3000:3000 --name meli-test-1 meli-test:latest`

En ambos casos se levanta un servidor local (http://localhost:3000)

## Consideraciones

### Arquitectura
La aplicacion corre bajo Node con ExpressJS. La aplicacion web funciona con **SSR** (Server-Side Rendering) para facilitar la lectura del sitio a los Web Crawlers y porque puede mejorar la velocidad de renderizado para los clientes ya que no depende de sus computadoras.

La biblioteca / framework utilizada para el Font-End es `React 16`. Los componentes permiten reutilizar contenido y los hooks serán utiles al momento de modularizar funcionalidades.

Se agregó `React Helmet` para la futura inyección de tags Meta en la cabecera y la modificacion del titulo del sitio segun su direccion.

El módulo `serialize-javascript` es similar a la funcion JSON.stringify, permite obtener la informacion de los gateway y empaquetarla junto con la aplicación. Esto evita que el cliente haga dos request y mejora el tiempo de respuesta.

El proyecto cuenta con un archivo Dockerfile para asegurar consistencia a la hora de probarlo.