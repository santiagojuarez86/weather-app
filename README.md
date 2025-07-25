# Clima App - Pronóstico del Tiempo

Una aplicación web del clima con diseño glassmorphism y tonos oscuros, desarrollada con React, TypeScript, Tailwind CSS y Vite.

## Características

- 🌍 Detección automática de ubicación
- 🔍 Búsqueda de ciudades
- 🌡️ Información completa del clima
- 📅 Pronóstico de 5 días
- 📱 Diseño mobile-first responsivo
- 🌙 Tema oscuro con efectos glassmorphism
- 🇪🇸 Completamente en español

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

3. Crear build para producción:
   ```bash
   npm run build
   ```

4. Previsualizar build:
   ```bash
   npm run preview
   ```

## API

La aplicación utiliza la API gratuita de Open Meteo para obtener datos del clima:
- **Weather API**: https://api.open-meteo.com/
- **Geocoding API**: https://geocoding-api.open-meteo.com/

## Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Iconos

## Estructura del Proyecto

```plaintext
src/
├── components/    # Componentes React
├── hooks/         # Custom hooks
├── App.tsx        # Componente principal
├── main.tsx       # Punto de entrada
└── index.css      # Estilos globales
```

## Licencia

MIT
