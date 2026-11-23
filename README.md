# Kodigo Music

Aplicación web de música desarrollada con React y Vite para practicar navegación SPA, estado compartido y persistencia en el navegador.

## Funcionalidades

- Explorar canciones iniciales en la página principal.
- Buscar y filtrar canciones en la biblioteca.
- Agregar nuevas canciones.
- Marcar y quitar canciones favoritas.
- Eliminar canciones de la biblioteca.
- Reproducir la canción seleccionada desde el reproductor inferior.
- Conservar los cambios en `localStorage`.

## Tecnologías

- React
- React Router
- Vite
- JavaScript
- CSS

## Ejecución local

```bash
npm install
npm run dev
```

Para generar y revisar la versión de producción:

```bash
npm run lint
npm run build
npm run preview
```

## Rutas

- `/` — Inicio y canciones disponibles.
- `/biblioteca` — Biblioteca completa, búsqueda y filtros.
- `/agregar` — Formulario para agregar una canción.

## Persistencia

Las canciones se guardan en el navegador con la clave `kodigo_music_canciones_v2`. Los datos no se sincronizan entre dispositivos.

## Aplicación publicada

https://kodigo-music.alexguevara12715.workers.dev/

## Proyecto académico

Desarrollado como proyecto práctico de desarrollo frontend en Kodigo.
