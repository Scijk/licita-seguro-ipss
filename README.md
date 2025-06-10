# React + Vite

**Versión:** 1.0.0 
**Fecha:** 10/06/2025 
**Desarrollado por:** Christopher Gómez para FrontEnd Ipss

tejelanas_vivi/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── LicitacionCard.jsx
│   ├── pages/
│   │   ├── BuscarProveedor.jsx
│   │   ├── DetalleLicitacion.jsx
│   │   ├── Home.jsx
│   │   └── Licitaciones.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md

- **public/**: Archivos estáticos.
- **src/**: Código fuente principal.
  - **components/**: Componentes reutilizables de React.
  - **pages/**: Componentes utilizados para las pantallas.
  - **services/**: Se utiliza para las llamadas a las apis externas.
- **App.js**: Componente principal de la aplicación. Orquesta las rutas a las distintas páginas.

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Scijk/licita-seguro-ipss.git
   cd licita-seguro-ipss
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```

## Uso de los Componentes

- **Header**: Muestra la cabecera y navegación principal.
  ```jsx
  import Header from './components/Header';
  <Header />
  ```
- **Footer**: Pie de página con información de contacto o enlaces.
  ```jsx
  import Footer from './components/Footer';
  <Footer />
  ```

Puedes personalizar los componentes y pasarles props según tus necesidades.

## Scripts Disponibles

- `npm run dev`: Ejecuta la app en modo desarrollo.
- `npm run lint`: Ejecuta los tests con lint.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Expone la previsualización de la versión de producción en un servidor local.