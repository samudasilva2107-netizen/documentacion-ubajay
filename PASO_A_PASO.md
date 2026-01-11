# Guía de Despliegue: Ubajay Digital (Next.js)

Esta carpeta contiene la versión limpia y optimizada del proyecto **Ubajay Digital** migrado a Next.js 16. Siga estos pasos para subir el proyecto a producción.

## 1. Requisitos Previos
- Cuenta en **GitHub**.
- Cuenta en **Vercel** (conectada a GitHub).
- Conocimientos básicos de la terminal.

## 2. Estructura de la Carpeta
- `app/`: Componentes de página, estilos globales y fuentes.
- `lib/`: Configuraciones de Firebase y utilidades.
- `public/`: Imágenes y activos estáticos.
- Archivos de configuración: `package.json`, `next.config.ts`, `tsconfig.json`.

## 3. Paso a Paso para el Equipo

### Paso A: Subir a GitHub
1. Inicializar Git en esta carpeta:
   ```bash
   git init
   ```
2. Agregar todos los archivos:
   ```bash
   git add .
   ```
3. Crear el primer commit:
   ```bash
   git commit -m "Migración inicial a Next.js"
   ```
4. Crear un repositorio en GitHub y seguir las instrucciones para "push an existing repository".

### Paso B: Conectar con Vercel
1. Ve a [Vercel](https://vercel.com) y haz clic en **"Add New"** > **"Project"**.
2. Selecciona el repositorio de GitHub que acabas de subir.
3. En la configuración del proyecto, asegúrate de que el **Framework Preset** sea "Next.js".

### Paso C: Variables de Entorno (CRÍTICO)
Para que Firebase funcione en producción, debes agregar las siguientes variables de entorno en el panel de Vercel (**Settings > Environment Variables**):

> [!IMPORTANT]
> El código actual tiene las claves de Firebase configuradas en `lib/firebase-config.ts`. Para mayor seguridad, se recomienda reemplazarlas por variables `process.env`.

### Paso D: Desplegar
Haz clic en **"Deploy"**. Vercel detectará automáticamente la configuración y desplegará la aplicación en cuestión de minutos.

## 4. Comandos Útiles (Local)
Si necesitan trabajar localmente en esta carpeta:
- Instalar dependencias: `npm install`
- Correr en modo desarrollo: `npm run dev`
- Probar el build: `npm run build`

---
*Preparado por Antigravity — Optimizando Ubajay Digital.*
