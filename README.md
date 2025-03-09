# PinApp Products - Challenge Frontend Senior

Code challenge para PinApp. La aplicación permite visualizar un catálogo de productos, realizar búsquedas y ver detalles específicos de cada producto.

## 🚀 Tecnologías Utilizadas

- Next.js
- TypeScript
- TailwindCSS
- Shadcn UI
- React Query
- JSON Server
- Faker.js

## 🌟 Características Principales

### Página de Listado de Productos (PLP)

- Ruta: `/`
- Búsqueda por código SKU o nombre de producto con debounce de 500ms
- Visualización de información básica: SKU, categoría, marca y precio
- Botón "Ver Detalle" para navegar a la página de detalle
- Indicador de carga durante la búsqueda

### Página de Detalle de Producto (PDP)

- Ruta: `/products/:sku`
- Visualización completa de la información del producto:
  - Nombre del producto
  - Código SKU
  - Imagen principal
  - Categoría
  - Marca
  - Precio de lista
  - Especificaciones técnicas
- Manejo de errores:
  - Mensaje "No encontrado" para errores 404
  - Mensaje "No se pudo cargar" para errores 500

## 💻 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pinapp-products.git
cd pinapp-products

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🔌 API

La aplicación consume datos de una API desplegada en Render https://pinapp-products-api.onrender.com/, que simula los endpoints descritos en el archivo OpenAPI. Esto permite probar la aplicación sin necesidad de correr localmente el server.

Si deseas ejecutar la API localmente, puedes clonar el repositorio:

```bash
git clone https://github.com/aSampo/pinapp-products-api.git
cd pinapp-products-api
npm install
npm start
```

**Importante:** Para utilizar el servidor local, debes modificar el archivo `.env.local` y cambiar la URL de la API a `http://localhost:8080`.

La API utiliza JSON Server y Faker.js para generar datos de prueba. Los endpoints disponibles son:

- `GET /products` - Obtener todos los productos
- `GET /products/:id` - Obtener un producto por ID

## 🚀 Despliegue

La aplicación está desplegada en Vercel y pueden a acceder a través de:

[https://pinapp-products.vercel.app](https://pinapp-products.vercel.app)
