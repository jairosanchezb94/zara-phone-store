ZARA Challenge - Mobile Phone Store
Este proyecto es una aplicación web para visualizar, buscar y gestionar un catálogo de teléfonos móviles. Permite a los usuarios consultar detalles específicos de cada dispositivo y gestionar un carrito de compras.
🚀 Características

Visualización de catálogo de teléfonos con filtrado por nombre o marca
Detalles de producto con selección de color y almacenamiento
Gestión de carrito de compras con persistencia en localStorage
Interfaz responsiva y accesible
Diseño minimalista siguiendo los mockups proporcionados

🛠️ Tecnologías utilizadas

React 18
React Router para la navegación
Context API para la gestión del estado
SASS para los estilos
Vite como herramienta de build
ESLint y Prettier para linting y formateo
Vitest y React Testing Library para pruebas

📁 Estructura del proyecto
Copy/src
  /assets            # Imágenes, fuentes, etc.
  /components        # Componentes reutilizables
  /context           # Contextos para la aplicación
  /hooks             # Custom hooks
  /pages             # Páginas/Vistas principales
  /services          # Servicios para API
  /styles            # Estilos SASS
  /utils             # Utilidades y helpers
📥 Instalación

Clonar el repositorio:

bashCopygit clone 
cd zara-phone-store

Instalar dependencias:

bashCopynpm install

Iniciar el servidor de desarrollo:

bashCopynpm run dev
📜 Scripts disponibles

npm run dev: Inicia el servidor de desarrollo
npm run build: Construye la aplicación para producción
npm run preview: Vista previa de la build de producción
npm run test: Ejecuta las pruebas
npm run lint: Ejecuta el linter

🔌 API
La aplicación se conecta a una API REST que proporciona información sobre los productos. Todas las solicitudes a la API incluyen la clave de autenticación en el encabezado x-api-key.
🔄 Modos de desarrollo y producción

Modo Desarrollo: Sirve los assets sin minimizar mediante Vite
Modo Producción: Sirve los assets concatenados y minimizados con la build de producción

📱 Vistas principales

Vista Listado de Teléfonos

Muestra los primeros 20 teléfonos desde la API
Buscador en tiempo real que filtra los teléfonos por nombre o marca
Contador de resultados de búsqueda
Navegación a la vista de detalle al hacer clic en un teléfono


Vista Detalle de Teléfono

Muestra detalles completos del dispositivo
Permite seleccionar color y almacenamiento
Actualiza dinámicamente la imagen según el color seleccionado
Actualiza el precio según el almacenamiento seleccionado
Muestra productos similares en la parte inferior


Vista Carrito

Muestra los productos añadidos al carrito
Permite eliminar productos
Muestra el precio total
Permite volver a la vista principal para seguir comprando



📝 Requisitos cumplidos

✅ Implementación con React 18+
✅ Gestión de estado con Context API
✅ Uso de Sass para los estilos
✅ Persistencia del carrito con localStorage
✅ Diseño responsive
✅ Accesibilidad
✅ Uso de linters y formatters
✅ README detallado

👥 Autor
Jairo Sánchez Béjar - jairosanchezb5@gmail.com