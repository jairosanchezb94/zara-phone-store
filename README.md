# ZARA Challenge - Mobile Phone Store

Este proyecto es una aplicación web para visualizar, buscar y gestionar un catálogo de teléfonos móviles. Permite a los usuarios consultar detalles específicos de cada dispositivo y gestionar un carrito de compras.

## 🚀 Características

- **Visualización de catálogo**: Muestra los primeros 20 teléfonos obtenidos desde la API, con filtrado en tiempo real por nombre o marca.
- **Detalles de producto**: Incluye selección de color y almacenamiento. La imagen del móvil se actualiza dinámicamente según el color seleccionado y el precio se ajusta según el almacenamiento.
- **Gestión del carrito**: Permite añadir y eliminar productos, con persistencia en `localStorage`.
- **Tooltip de advertencia**: Se implementó un tooltip que alerta al usuario cuando intenta añadir más de dos móviles al carrito, preguntando si desea agregar otro.
- **Interfaz responsiva y accesible**: Se han aplicado mejoras visuales (comentadas en el código) para adaptar el diseño a diferentes dispositivos y mejorar la experiencia de usuario.
- **Pruebas**: Se añadió un test simple usando React Testing Library para verificar que la vista principal renderiza correctamente el input de búsqueda.

## 🛠️ Tecnologías utilizadas

- **Frontend**: React 18, React Router.
- **Estilos**: SASS.
- **Build**: Vite.
- **Calidad de código**: ESLint y Prettier.
- **Pruebas**: Vitest y React Testing Library.

## 📁 Estructura del proyecto

```
/src
  /assets          # Imágenes, fuentes, etc.
  /components      # Componentes reutilizables (incluye el Tooltip para el carrito)
  /context         # Contextos para la aplicación (gestión de la API y del carrito)
  /pages           # Páginas/Vistas principales (Listado, Detalle y Carrito)
  /services        # Servicios para conexión a la API
  /styles          # Estilos SASS
  /utils           # Utilidades y helpers
  /tests           # Pruebas (se incluye un test simple que verifica la presencia del input de búsqueda)
```

## 📥 Instalación

1. Clona el repositorio:
   ```bash
   git clone [<URL_DEL_REPOSITORIO>](https://github.com/jairosanchezb94/zara-phone-store)
   cd zara-phone-store
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📜 Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run test`: Ejecuta las pruebas.

## 🔌 API

La aplicación se conecta a una API REST que proporciona información sobre los productos. Todas las solicitudes a la API incluyen la clave de autenticación en el encabezado `x-api-key`.

## 🔄 Modos de desarrollo y producción

- **Modo Desarrollo**: Sirve los assets sin minimizar mediante Vite.
- **Modo Producción**: Sirve los assets concatenados y minimizados con la build de producción.

## 📱 Vistas principales

### Vista Listado de Teléfonos

- Muestra los primeros 20 teléfonos desde la API.
- Incluye un buscador en tiempo real que filtra los teléfonos por nombre o marca.
- Muestra un contador de resultados de búsqueda.
- Permite navegar a la vista de detalle al hacer clic en un teléfono.

### Vista Detalle de Teléfono

- Muestra detalles completos del dispositivo.
- Permite seleccionar color y almacenamiento, actualizando dinámicamente la imagen y el precio.
- Muestra productos similares en la parte inferior.

### Vista Carrito

- Muestra los productos añadidos al carrito.
- Permite eliminar productos individualmente.
- Muestra el precio total.
- Incluye un tooltip de advertencia que alerta al usuario si intenta añadir más de dos móviles, preguntando si realmente desea agregar otro.

## 📝 Requisitos cumplidos

- ✅ Implementación con React 18+.
- ✅ Gestión de estado con Context API.
- ✅ Uso de SASS para los estilos.
- ✅ Persistencia del carrito con `localStorage`.
- ✅ Diseño responsive y mejoras visuales (comentadas en el código).
- ✅ Accesibilidad.
- ✅ Uso de linters y formatters.
- ✅ README detallado.
- ✅ Pruebas unitarias básicas (se añadió un test que verifica la existencia del input de búsqueda en la vista principal).

## � Pruebas

Se añadió un test simple en `/src/tests/App.test.jsx` que verifica que la vista principal renderiza correctamente el input de búsqueda con el placeholder `"Search for a smartphone..."`. Este test utiliza React Testing Library y `jest-dom` para asegurar la presencia del elemento.

Ejemplo de test:

```jsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the main component with search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/search for a smartphone/i);
  expect(searchInput).toBeInTheDocument();
});
```

## 👥 Autor

**Jairo Sánchez Béjar**  
📧 jairosanchezb5@gmail.com
```
