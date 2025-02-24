# Proyecto Contact Center: .NET y Next.js

Este repositorio contiene dos proyectos:

- **Proyecto .NET:** Backend desarrollado en .NET.
- **Proyecto Next.js:** Frontend desarrollado en Next.js.

Ambos proyectos se encuentran en la misma carpeta del repositorio.

## Requisitos Previos

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (incluye npm)
- (Opcional) [concurrently](https://www.npmjs.com/package/concurrently) para ejecutar ambos proyectos con un solo comando.
- Cuenta en [Supabase](https://supabase.com/) para gestionar la base de datos.

## Estructura del Proyecto

La estructura de carpetas es la siguiente:


## Opciones para Ejecutar los Proyectos

### 1. Ejecutar en Terminales Separadas

#### Proyecto .NET

1. Abre una terminal.
2. Navega a la carpeta del proyecto .NET:
   ```bash
   cd ContactCenterBackend
3. Ejecuta el proyecto:
    ```bash
    dotnet run

#### Proyecto Nextjs

1. Abre una terminal.
2. Navega a la carpeta del proyecto Nextjs:
   ```bash
   cd contact-center-app
3. Ejecuta el proyecto:
    ```bash
    npm run dev
Nota: Ambos proyectos se ejecutarán en puertos distintos (por defecto, .NET en el 5000 y Next.js en el 3000). Asegúrate de que no haya conflictos de puertos.

Si algo no funciona revisa bien si estan instaladas las dependencias.


### 2. Ejecutar Ambos Proyectos Simultáneamente con concurrently
Si prefieres iniciar ambos proyectos con un solo comando, sigue estos pasos:

Instalar concurrently:

Desde la raíz del repositorio (mi-carpeta), instala el paquete:

    npm install concurrently --save-dev

### 3. En la terminal, ejecuta:
    npm run start:both



## Configuración de Supabase

1. **Crear un proyecto en Supabase:**

   - Regístrate o inicia sesión en [Supabase](https://supabase.com/).
   - Crea un nuevo proyecto y toma nota de las credenciales (URL y API Key) que te proporciona la plataforma. Estas credenciales se usarán en tu proyecto .NET o Next.js para conectar con la base de datos.

2. **Crear las tablas en Supabase:**

   Accede al editor SQL de Supabase y ejecuta los siguientes comandos para crear las tablas de **agentes** y **clientes**:

   ```sql
   -- Crear tabla para agentes
   CREATE TABLE agents (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name TEXT NOT NULL,
       status TEXT NOT NULL,
       wait_time INTEGER NOT NULL
   );

   -- Crear tabla para clientes
   CREATE TABLE clients (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name TEXT NOT NULL,
       wait_time INTEGER NOT NULL
   );

Configura las claves en el Backend para que se conecte correctamente con SUPABASE.

## Estructuración de Componentes
Organizamos la aplicación en partes pequeñas y reutilizables. Por ejemplo, tenemos componentes para mostrar tarjetas de agentes y clientes, una lista para cada uno y un componente de filtro. La estructura se dividió en carpetas:

 components/ para la UI,
 
 contexts/ para el manejo global del estado,
 
 hooks/ para encapsular lógica reutilizable,
 
 services/ para la conexión con la API RESTful.
 
 Manejo del Estado y Actualizaciones en Tiempo Real
 
 Utilizamos la Context API y hooks personalizados (como useAgents y useClients) para mantener el estado de agentes y clientes. Además, configuramos un WebSocket que escucha cambios en tiempo real (por ejemplo, cuando un agente cambia de estado) y actualiza inmediatamente la UI.

## Renderizado y Diferencias entre MPA y SPA

Server-Side Rendering (SSR): Algunas partes se renderizan en el servidor, lo que mejora el SEO y la carga inicial.

Client-Side Rendering (CSR): Los componentes interactivos se renderizan en el cliente para brindar una experiencia fluida.

SPA vs. MPA: Una SPA carga todo en una sola página y ofrece transiciones muy rápidas, mientras que una MPA recarga la página en cada navegación. Next.js nos permite combinar ambos enfoques, aprovechando lo mejor de cada uno.

Conexión con el Backend (API RESTful)

La conexión se realiza mediante llamadas a la API usando la Fetch API. Cada solicitud valida la respuesta y, en caso de error, se maneja de forma adecuada. Esto asegura que el frontend esté siempre sincronizado con el backend, mostrando datos actualizados desde el inicio y a través de WebSockets.
