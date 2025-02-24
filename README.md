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