# avalan.chat

This is a simple HTML form for submitting the name of your project.

### Prerequisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Install the `http-server` package globally:

```sh
npm install -g http-server
```

```sh
npx eslint --init
```


## Running the Server

### Locally

```sh {"background":"true"}
http-server
```

## Deployment

```
firebase deploy --only functions
```

## Avalancha

* Crea y organiza tareas (usando preguntas generadoras) (Mental map)
* Te permite documentar tu progreso (no simplemente borrando las tareas si no manteniendo la información descubierta allí, bien organizada)
* Permite buscar en las tareas.
* Permite recortarlas y mezclar las tareas.
* Te "notifica" para que no abandones tus proyectos.
* Te mantiene enfocado en la tarea mas importante.

## Infra:
* Autenticación con la cosa mas simple y barata que exista
* Funciones serverless las mas baratas para la interacción con los LLM

### Futuro:
* Exportar tus datos en documentos de word y excel (Para google drive o word, notion, confluence, etc.)
* Agregar tus datos actuales (código, documentos, etc)
* Usar otros LLMs
* Desacoplarte y montar tu propia infraestructura (autenticación, LLMs, DBs, etc)

### Flujo:

1. Hacer preguntas para entender de que se trata el proyecto.

   1. Hacer preguntas y categorías
   2. Guardarlo en una DB

2. Ordenar las respuestas y base de conocimiento en categorías relacionadas y niveles de relación.
3. Iterar esto.
4. Una vez se tenga claro el scope y alcance. Se sugiere tareas elementales.?? Las tareas deben ser SMART. La respuesta no es un check si no una prueba de que se hizo la tarea (en texto por ahora)
5. Las preguntas en realidad son tareas?
6. Las categorias en realidad son preguntas?
7. Categoría, Pregunta, Tarea
8. 

```sh
pipreqs src/
```
