# Rutina — Ejercicios y racha

App personal para registrar entrenamientos con dos mancuernas, mantener una racha diaria y seguir el progreso. Incluye plan semanal de fuerza y una guía de comidas para recomposición corporal.

**Demo:** https://rutina-fitness-ten.vercel.app

## Funciones

- **Hoy**: racha actual, progreso del día y registro de cada ejercicio con `+`/`−` según su paso.
- **Plan**: rutina recomendada de 4 días (superior/inferior) y split de 6 días estilo empuje/tirón/pierna, con ejercicios posibles usando solo dos mancuernas.
- **Comidas**: principios de déficit moderado y proteína alta, día de ejemplo y fuentes de proteína.
- **Progreso**: últimos 14 días, días activos y total semanal por ejercicio.
- **Ajustes**: editar ejercicios, metas, unidades y pasos.

## Stack

React 19 + TypeScript + Vite 8. CSS plano, sin librerías de UI ni de animación. Sin backend.

## Datos

Todo se guarda en `localStorage` bajo la clave `rutina:v1`. No se envía nada a un servidor. Los datos son por navegador y dispositivo; al borrar los datos del sitio se pierden.

## Desarrollo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Seguridad

`vercel.json` define cabeceras para todas las rutas:

- Content-Security-Policy con `default-src 'self'` y `frame-ancestors 'none'`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` sin cámara, micrófono, ubicación ni pagos.
- `Strict-Transport-Security`.

## Aviso

El contenido de entrenamiento y nutrición es informativo y general, no consejo médico. Ajusta cargas y porciones a tu situación y consulta a un profesional si corresponde.
