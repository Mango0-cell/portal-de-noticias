# Modern News Portal

A production-ready, full-featured news portal built with cutting-edge technologies. This application provides an exceptional user experience with real-time news updates, advanced search capabilities, and a beautiful dark mode interface.

![News Portal Preview](https://github.com/user-attachments/assets/1cd4f5eb-9e2f-45b2-b2e2-80ac6e567727)

## ✨ Features

### Core Functionality
- **📰 Latest News Feed**: Browse the most recent headlines from multiple sources with intelligent pagination
- **📄 Article Detail Pages**: Full article view with hero images, metadata, and related article recommendations
- **🔍 Advanced Search**: Powerful search functionality with real-time results and query highlighting
- **🏷️ Category Filters**: 7 distinct categories (General, Business, Technology, Entertainment, Health, Science, Sports)
- **🌓 Dark Mode**: Seamless toggle between light and dark themes with localStorage persistence
- **📱 Fully Responsive**: Pixel-perfect design across mobile, tablet, and desktop devices
- **⚡ Performance Optimized**: Lazy loading, code splitting, and optimized images for fast page loads
- **♿ Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### User Experience
- **Skeleton Loading States**: Smooth loading transitions that maintain layout stability
- **Error Boundaries**: Graceful error handling with user-friendly fallback UI
- **Empty States**: Helpful guidance when no results are found
- **Pagination Controls**: Easy navigation through large result sets (limited to 10 pages for performance)
- **URL State Management**: Shareable search URLs with query parameters
- **Responsive Navigation**: Mobile-friendly hamburger menu with smooth animations

## 🛠️ Tech Stack

This project leverages modern web development technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router architecture
- **UI Library**: [React 19.2.3](https://react.dev/) featuring Server and Client Components
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with RTK Query for efficient data fetching
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom theme configuration
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict type checking for reliability
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, customizable icons
- **API**: [NewsAPI.org](https://newsapi.org/) for real-time news data

## 📁 Project Architecture

The application follows Next.js 16 App Router conventions with a clean, scalable folder structure:

```
portal-de-noticias/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with Redux Provider
│   │   ├── page.tsx                 # Home page (latest news)
│   │   ├── loading.tsx              # Global loading state
│   │   ├── error.tsx                # Global error boundary
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── globals.css              # Global styles + Tailwind
│   │   │
│   │   ├── article/[id]/            # Dynamic article routes
│   │   │   ├── page.tsx            # Article detail view
│   │   │   ├── loading.tsx         # Article loading state
│   │   │   └── error.tsx           # Article error handling
│   │   │
│   │   └── search/                  # Search & filter page
│   │       ├── page.tsx            # Search interface
│   │       ├── loading.tsx         # Search loading state
│   │       └── error.tsx           # Search error handling
│   │
│   ├── components/                   # Reusable React components
│   │   ├── layout/                  # Layout components
│   │   │   ├── Navbar.tsx          # Navigation with theme toggle
│   │   │   └── Footer.tsx          # Site footer
│   │   │
│   │   ├── news/                    # News-specific components
│   │   │   ├── NewsCard.tsx        # Individual news card
│   │   │   ├── NewsList.tsx        # List view of news
│   │   │   ├── NewsGrid.tsx        # Grid view of news
│   │   │   ├── ArticleDetail.tsx   # Full article display
│   │   │   └── RelatedArticles.tsx # Related content section
│   │   │
│   │   ├── search/                  # Search functionality
│   │   │   ├── SearchBar.tsx       # Search input component
│   │   │   ├── CategoryFilter.tsx  # Category filter chips
│   │   │   └── SearchResults.tsx   # Search results display
│   │   │
│   │   ├── ui/                      # Generic UI components
│   │   │   ├── Button.tsx          # Reusable button
│   │   │   ├── Card.tsx            # Card container
│   │   │   ├── Skeleton.tsx        # Loading skeletons
│   │   │   └── Pagination.tsx      # Pagination controls
│   │   │
│   │   └── common/                  # Shared utilities
│   │       ├── LazyImage.tsx       # Optimized image loader
│   │       └── ErrorBoundary.tsx   # Error boundary wrapper
│   │
│   ├── store/                        # Redux state management
│   │   ├── index.ts                 # Store configuration
│   │   ├── hooks.ts                 # Typed Redux hooks
│   │   ├── slices/
│   │   │   └── themeSlice.ts       # Theme state (light/dark)
│   │   └── services/
│   │       └── newsApi.ts          # RTK Query API service
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useTheme.ts              # Theme management
│   │   └── useMediaQuery.ts        # Responsive utilities
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── providers.tsx            # Redux Provider wrapper
│   │   └── utils.ts                 # Helper functions
│   │
│   ├── types/                        # TypeScript definitions
│   │   ├── news.ts                  # News API types
│   │   └── index.ts                 # Type exports
│   │
│   └── constants/                    # App configuration
│       └── index.ts                 # Constants & config
│
├── public/                           # Static assets
│   ├── favicon.ico
│   └── [other static files]
│
├── .env.local.example               # Environment template
├── CONTRIBUTING.md                  # Contribution guide
├── PROJECT_SUMMARY.md              # Detailed project docs
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies
```

### Key Architecture Decisions

- **App Router**: Leverages Next.js 16's latest routing paradigm with built-in layouts and loading states
- **Component Organization**: Grouped by feature domain (news, search, ui) for better maintainability
- **State Management**: RTK Query handles API caching while Redux manages global UI state (theme)
- **Type Safety**: Comprehensive TypeScript coverage ensures reliability and better developer experience
- **Code Splitting**: Automatic route-based splitting for optimal performance

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A **NewsAPI.org** account ([Sign up free](https://newsapi.org/register))

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mango0-cell/portal-de-noticias.git
   cd portal-de-noticias
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including Next.js, React, Redux, Tailwind CSS, and other dependencies.

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Open `.env.local` and add your NewsAPI.org API key:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_actual_api_key_here
   ```
   
   > 💡 **Getting an API Key**: Visit [newsapi.org](https://newsapi.org/), sign up for a free account, and copy your API key from the dashboard. The free tier includes 100 requests per day.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:3000](http://localhost:3000)

5. **Build for production** (optional)
   ```bash
   npm run build
   npm start
   ```
   
   This creates an optimized production build and starts the production server.

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Create optimized production build
- `npm start` - Start production server (requires `npm run build` first)
- `npm run lint` - Run ESLint to check code quality

## 🎨 Feature Highlights

### 1. Home Page (`/`)
![Home Page](https://github.com/user-attachments/assets/1cd4f5eb-9e2f-45b2-b2e2-80ac6e567727)

The home page displays the latest news articles in a responsive grid layout:
- **Responsive Grid**: Automatically adjusts from 1 column (mobile) to 4 columns (large desktop)
- **Pagination**: Navigate through multiple pages with visual indicators
- **Loading States**: Smooth skeleton screens while content loads
- **Error Handling**: User-friendly error messages if content fails to load

### 2. Article Detail Page (`/article/[id]`)
Each article has a dedicated page featuring:
- **Hero Image**: Large, eye-catching image at the top
- **Full Content**: Complete article text with proper typography
- **Metadata**: Author, publication date, and source information
- **Breadcrumb Navigation**: Easy way to return to the home page
- **Related Articles**: Up to 4 related articles at the bottom
- **External Link**: Button to read the full article on the original source

### 3. Search & Filter Page (`/search`)
![Search Page](https://github.com/user-attachments/assets/23a5219e-f506-4629-879d-47e45aeacc29)

Advanced search capabilities include:
- **Real-time Search**: Instant results as you type (with debouncing)
- **Category Filters**: 7 news categories with visual chip selection
- **URL Parameters**: Shareable search URLs (e.g., `/search?q=technology&category=tech`)
- **Empty States**: Helpful messages when no results are found
- **Search Results Counter**: Shows number of articles found

### 4. Dark Mode
The theme system provides:
- **Toggle Button**: Sun/Moon icon in the navbar for easy switching
- **Persistence**: Remembers your preference via localStorage
- **System Detection**: Respects your OS theme preference on first visit
- **Smooth Transitions**: No jarring color changes, just smooth animations
- **Comprehensive Coverage**: All components adapt to the selected theme

## 📱 Available Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Home page | Latest news grid, pagination, loading states |
| `/article/[id]` | Article detail | Full article view, related content, breadcrumbs |
| `/search` | Search page | Search bar, category filters, results display |
| `/search?q=keyword` | Search results | Filtered by keyword with URL parameters |
| `/search?category=tech` | Category filter | Filter by specific news category |
| `/search?q=ai&category=technology` | Combined filters | Search with both keyword and category |

### Example URLs
- `http://localhost:3000/` - Latest news
- `http://localhost:3000/search?q=artificial+intelligence` - Search for AI news
- `http://localhost:3000/search?category=technology` - Technology news only
- `http://localhost:3000/article/[encoded-url]` - Specific article (URLs are encoded)

## 🎯 Component Library

### Layout Components

#### Navbar
- Responsive navigation bar with logo
- Links to Home and Search pages
- Theme toggle button (Sun/Moon icon)
- Mobile hamburger menu for small screens
- Sticky positioning for better UX

#### Footer
- Site information and description
- Quick links to main pages
- Social media icons (GitHub, Twitter, LinkedIn)
- Copyright notice with current year

### News Components

#### NewsCard
Individual news article card displaying:
- Article image with lazy loading
- Category badge
- Article title (max 2 lines)
- Description excerpt (max 3 lines)
- Source name and publication date
- Hover effects for interactivity

#### NewsGrid
Responsive grid container for news cards:
- 1 column on mobile (< 768px)
- 2 columns on tablet (768px - 1024px)
- 3 columns on desktop (1024px - 1280px)
- 4 columns on large desktop (> 1280px)
- Empty state handling

#### ArticleDetail
Comprehensive article view including:
- Breadcrumb navigation
- Category badge
- Article title (large, prominent)
- Author and date metadata
- Hero image
- Full article content
- "Read Full Article" button

#### RelatedArticles
Shows related content with:
- Section header
- Grid of up to 4 related articles
- Automatic filtering (excludes current article)

### Search Components

#### SearchBar
Feature-rich search input:
- Search icon indicator
- Clear button (X) when text is entered
- Submit button
- Placeholder text
- Real-time value management
- Form submission handling

#### CategoryFilter
Category selection interface:
- 7 category chips/buttons
- Visual active state (blue background)
- Hover effects
- Click to filter functionality
- Responsive wrapping

#### SearchResults
Search results display with:
- Result count indicator
- Empty state with helpful message
- Loading spinner
- Grid layout for results

### UI Components

#### Button
Versatile button component with:
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **States**: default, hover, focus, disabled
- Full keyboard accessibility
- Custom className support

#### Card
Flexible card container with sections:
- CardHeader - Top section with border
- CardContent - Main content area
- CardFooter - Bottom section with border
- Hover effects (optional)
- Dark mode support

#### Skeleton
Loading placeholder components:
- Animated pulse effect
- Various sizes and shapes
- NewsCardSkeleton - Pre-built news card placeholder
- Maintains layout during loading

#### Pagination
Page navigation controls:
- Previous/Next buttons
- Page number buttons
- Current page highlight
- Ellipsis for many pages
- Disabled state for boundaries
- Keyboard accessible

### Common Components

#### LazyImage
Optimized image component:
- Lazy loading with Next.js Image
- Loading state animation
- Error handling with fallback
- Inline SVG placeholder (no external dependencies)
- Responsive sizing
- Dark mode compatible

#### ErrorBoundary
React error boundary for graceful failures:
- Catches React component errors
- User-friendly error display
- "Try Again" functionality
- Prevents entire app crashes
- Console logging for debugging

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_NEWS_API_KEY` | Your NewsAPI.org API key | Yes | None |

### Security Notes
- API keys are validated at runtime with console warnings
- No sensitive data is committed to the repository
- `.env.local` is gitignored by default
- Use `.env.local.example` as a template

## ⚡ Performance Optimizations

This application is built with performance in mind:

### Image Optimization
- **Next.js Image Component**: Automatic image optimization and lazy loading
- **Responsive Images**: Serves appropriate sizes based on device
- **WebP Format**: Modern format support for smaller file sizes
- **Priority Loading**: Hero images load with priority flag

### Code Splitting
- **Route-based Splitting**: Each page loads only required code
- **Dynamic Imports**: Heavy components load on-demand
- **Bundle Analysis**: Optimized bundle sizes

### Caching Strategy
- **RTK Query Cache**: API responses cached automatically
- **Stale-While-Revalidate**: Shows cached content while fetching updates
- **Cache Tags**: Efficient invalidation of related data

### Network Optimization
- **Debounced Search**: Reduces API calls during typing
- **Request Deduplication**: RTK Query prevents duplicate requests
- **Pagination**: Limits data fetched per request (12 items)

## ♿ Accessibility Features

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Visible focus indicators on all focusable elements
- Tab order follows logical page structure
- Skip links for main content (where applicable)

### Screen Reader Support
- Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, etc.)
- ARIA labels for icon buttons
- ARIA attributes for dynamic content
- Alt text for all images
- Proper heading hierarchy

### Visual Accessibility
- High contrast text colors (WCAG AA compliant)
- Clear focus indicators
- No content relying solely on color
- Readable font sizes (minimum 16px base)

## 🧪 Testing & Quality Assurance

### Code Quality
- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled for maximum type safety
- **Prettier**: Code formatting (if configured)

### Build Validation
```bash
# Run linter
npm run lint

# Build for production
npm run build

# Both should complete without errors
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm install` to ensure all dependencies are installed
- Check that you're using Node.js 18 or higher

**Issue**: API requests fail with 401 Unauthorized
- **Solution**: Verify your API key is correctly set in `.env.local`
- Make sure the variable name is exactly `NEXT_PUBLIC_NEWS_API_KEY`
- Restart the development server after changing environment variables

**Issue**: Images not loading
- **Solution**: Check that external image domains are configured in `next.config.ts`
- Some news sources may have CORS restrictions

**Issue**: Dark mode not persisting
- **Solution**: Check browser console for localStorage errors
- Ensure cookies/storage are not blocked
- Clear localStorage and try again

**Issue**: "No results found" on search page
- **Solution**: Try different search terms or categories
- Check API key rate limits (free tier: 100 requests/day)
- Verify internet connection

## 🚢 Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import repository in Vercel
3. Add `NEXT_PUBLIC_NEWS_API_KEY` to environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Supports Next.js with build plugins
- **AWS Amplify**: Full Next.js support
- **Railway**: Simple deployment with GitHub integration
- **DigitalOcean App Platform**: Managed Next.js hosting

### Environment Configuration
Make sure to set the `NEXT_PUBLIC_NEWS_API_KEY` environment variable in your deployment platform.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NewsAPI.org API Reference](https://newsapi.org/docs)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- News content provided by [NewsAPI.org](https://newsapi.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ by the development team** | [Report a Bug](https://github.com/Mango0-cell/portal-de-noticias/issues) | [Request a Feature](https://github.com/Mango0-cell/portal-de-noticias/issues)
