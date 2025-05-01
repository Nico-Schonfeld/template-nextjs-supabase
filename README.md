# Plantilla Next.js 15 + Supabase

Una plantilla moderna para construir aplicaciones full-stack con Next.js 15, Supabase, integración de MercadoPago y más.

## Características Principales

### Autenticación y Base de Datos Supabase
- Autenticación incorporada con Supabase
- Gestión de base de datos a través de Supabase
- Almacenamiento y recuperación segura de datos
- Capacidades en tiempo real
- Rutas protegidas con middleware

### Integración de MercadoPago
- Integración lista para usar del SDK de MercadoPago
- Configuración de procesamiento de pagos en `/services/mercadopago.services.ts`
- Manejo de webhooks en `/app/api/MercadoPago/route.ts`
- Implementación segura del flujo de pagos

### Componentes UI/UX
- Biblioteca de componentes Shadcn/UI
  - Componentes reutilizables para botones, formularios, tarjetas, etc.
  - Estilos modernos y atractivos
  - Fácil integración con Next.js
- Modo Oscuro/Claro con next-themes
  - Funcionalidad de cambio de tema
  - Colores y estilos personalizables
- TailwindCSS para estilos
  - Framework CSS basado en utilidades
  - Creación rápida de diseños personalizados

## Stack Tecnológico
- Next.js 15
- TypeScript
- Supabase
- MercadoPago
- Shadcn/UI
- TailwindCSS
- next-themes

## Instrucciones de uso

Te invito a que añadas o elimines módulos según tus necesidades. Modifica todo el código que desees y utiliza esta plantilla como base para crear tu mejor proyecto.

## Instalación

Clona el repositorio:

```bash
  git clone https://github.com/Nico-Schonfeld/template-nextjs-supabase.git
  cd template-nextjs-supabase
```

Instala las dependencias:

```bash
  npm install
```

Levanta el proyecto:

```bash
  npm run dev
```

## Autor

- [@nicoschonfeld](https://www.linkedin.com/in/nicoschonfeld/)
