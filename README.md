# Portal de Noticias 📰

Un portal de noticias moderno y responsivo construido con Next.js 16, React 19, y TypeScript. Integra la API de Event Registry para proporcionar noticias actualizadas en español en múltiples categorías.

## ✨ Características

- **🎨 Interfaz Moderna**: Diseño limpio y responsivo con Tailwind CSS 4
- **🌓 Modo Oscuro**: Soporte completo para tema claro y oscuro con persistencia
- **🔍 Búsqueda Avanzada**: Búsqueda de noticias con filtros por categoría
- **📱 Responsive**: Optimizado para dispositivos móviles, tablets y escritorio
- **⚡ Rendimiento**: 
  - Server Components y Client Components optimizados
  - Lazy loading de imágenes
  - React Compiler para optimizaciones automáticas
- **🔄 Estado Global**: Redux Toolkit con RTK Query para gestión de estado y caché
- **📄 Paginación**: Navegación eficiente entre páginas de noticias
- **🎯 Categorías**: Business, Technology, Science, Health, Sports, Entertainment, Politics
- **🚦 Manejo de Errores**: Error boundaries y páginas de error personalizadas
- **⏳ Estados de Carga**: Skeletons y loading states para mejor UX

## 🛠️ Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Estado**: [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **API**: [Event Registry API](https://eventregistry.org/)
- **Optimización**: React Compiler (Babel Plugin)

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 20+ 
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Mango0-cell/portal-de-noticias.git
cd portal-de-noticias
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Página principal con hero y grid de noticias
│   ├── layout.tsx         # Layout principal con providers
│   ├── article/[id]/      # Página de detalle de artículo
│   └── search/            # Página de búsqueda
├── components/
│   ├── common/            # Componentes reutilizables (LazyImage, ErrorBoundary)
│   ├── layout/            # Navbar, Footer, ThemeToggle
│   ├── news/              # NewsCard, NewsGrid, ArticleDetail
│   ├── search/            # SearchBar, CategoryFilter, SearchResults
│   └── ui/                # Componentes UI base (Button, Card, Pagination, Skeleton)
├── store/
│   ├── services/
│   │   └── newsApi.ts     # RTK Query API endpoints
│   └── slices/
│       └── themeSlice.ts  # Redux slice para tema
├── hooks/                 # Custom hooks (useTheme, useMediaQuery)
├── types/                 # Definiciones de TypeScript
├── constants/             # Constantes y configuración
└── lib/                   # Utilidades y providers
```

## 🎨 Características Técnicas

### Redux Toolkit Query
- Cache automático de peticiones
- Refetch inteligente
- Optimistic updates
- Gestión de estados de carga y error

### Optimizaciones de Rendimiento
- React Compiler para optimizaciones automáticas
- Code splitting automático con Next.js
- Lazy loading de imágenes con placeholder blur
- Server Components donde sea posible

### Accesibilidad
- Navegación por teclado
- ARIA labels apropiados
- Contraste de colores optimizado

## 📜 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 🌐 API

Este proyecto utiliza la [Event Registry API](https://eventregistry.org/) para obtener noticias. La API key está configurada en `/src/constants/index.ts`.

**Endpoints utilizados:**
- `getLatestNews`: Obtiene las últimas noticias
- `searchNews`: Busca noticias con filtros
- `getArticleById`: Obtiene un artículo específico
- `getRelatedArticles`: Obtiene artículos relacionados

## 🚀 Deploy

### Vercel (Recomendado)
El proyecto está optimizado para despliegue en [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mango0-cell/portal-de-noticias)

### Otros Proveedores
También puedes desplegar en:
- Netlify
- Railway
- AWS Amplify
- Docker

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Mango0-cell**
- GitHub: [@Mango0-cell](https://github.com/Mango0-cell)

---

Hecho con ❤️ usando Next.js y TypeScript



src/app/article/\[id\]/error.tsx src/app/article/\[id\]/loading.tsx src/app/article/\[id\]/page.tsx src/app/error.tsx src/app/globals.css src/app/layout.tsx src/app/loading.tsx src/app/not-found.tsx src/app/page.tsx src/app/search/error.tsx src/app/search/loading.tsx src/app/search/page.tsx src/components/layout/Footer.tsx src/components/layout/Navbar.tsx src/components/news/ArticleDetail.tsx src/components/news/NewsCard.tsx src/components/news/NewsList.tsx src/components/news/RelatedArticles.tsx src/components/search/CategoryFilter.tsx src/components/search/SearchBar.tsx src/components/ui/Button.tsx src/components/ui/Card.tsx src/components/ui/Pagination.tsx src/components/ui/Skeleton.tsx src/constants/index.ts src/hooks/useMediaQuery.ts src/hooks/useTheme.ts src/lib/providers.tsx src/lib/utils.ts src/store/hooks.ts src/store/index.ts src/store/services/newsApi.ts src/store/slices/themeSlice.ts src/types/index.ts src/types/news.ts tsconfig.jso 