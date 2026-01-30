# Modern News Portal

A production-ready news portal built with Next.js 16, React 19, Tailwind CSS, and RTK Query. Features a modern, responsive design with dark mode support and comprehensive news browsing capabilities.

## 🚀 Features

- **Latest News Feed**: Browse the most recent headlines with pagination
- **Article Detail Pages**: Full article view with related articles
- **Search & Filter**: Search by keywords and filter by categories
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Lazy Loading**: Images load on-demand for better performance
- **Loading States**: Skeleton screens for better UX
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: v19.2.3 with Server and Client Components
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS v4
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── loading.tsx          # Loading UI
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # 404 page
│   ├── article/[id]/        # Article detail pages
│   └── search/              # Search & filter page
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── news/                # News cards, grids, article detail
│   ├── search/              # Search bar, filters, results
│   ├── ui/                  # Button, Card, Skeleton, Pagination
│   └── common/              # LazyImage, ErrorBoundary
├── store/
│   ├── index.ts             # Redux store configuration
│   ├── hooks.ts             # Typed hooks
│   ├── slices/              # Redux slices (theme)
│   └── services/            # RTK Query API (newsApi)
├── lib/
│   ├── providers.tsx        # Redux Provider wrapper
│   └── utils.ts             # Utility functions
├── hooks/                   # Custom hooks (useTheme, useMediaQuery)
├── types/                   # TypeScript type definitions
└── constants/               # App constants and config
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portal-de-noticias
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your News API key to `.env.local`:
```env
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
```

Get your API key from [NewsAPI.org](https://newsapi.org/)

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 🎨 Features Detail

### Theme System
- Light/Dark mode toggle in navbar
- Persists user preference in localStorage
- Smooth transitions between themes
- System preference detection on first load

### News API Integration
- RTK Query for data fetching
- Automatic caching and refetching
- Loading and error states
- Pagination support

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768px - 1024px), desktop (> 1024px)
- Grid layouts adapt to screen size
- Mobile-friendly navigation

### Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus states for interactive elements
- Alt text for all images

## 📝 Available Routes

- `/` - Home page with latest news
- `/article/[id]` - Individual article detail page
- `/search` - Search and filter news articles
- `/search?q=keyword` - Search results for specific query
- `/search?category=technology` - Filter by category

## 🎯 Key Components

### Layout Components
- **Navbar**: Navigation with theme toggle and mobile menu
- **Footer**: Site information and quick links

### News Components
- **NewsCard**: Individual news article card
- **NewsGrid**: Responsive grid of news cards
- **ArticleDetail**: Full article view with metadata
- **RelatedArticles**: Shows related content

### UI Components
- **Button**: Customizable button with variants
- **Card**: Container component with sections
- **Skeleton**: Loading placeholders
- **Pagination**: Navigate through pages

### Search Components
- **SearchBar**: Search input with clear functionality
- **CategoryFilter**: Category selection chips
- **SearchResults**: Display search results with empty states

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_NEWS_API_KEY` | NewsAPI.org API key | Yes |

## 🧪 Development Notes

- The app uses NewsAPI.org which has rate limits on free tier
- Demo mode available without API key (limited functionality)
- Images from external sources are allowed via Next.js config
- All pages support SSR/SSG where appropriate

## 📄 License

This project is open source and available under the MIT License.
