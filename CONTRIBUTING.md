# Contributing to News Portal

Thank you for considering contributing to the News Portal project! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/portal-de-noticias.git
   cd portal-de-noticias
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   # Add your NewsAPI.org API key to .env.local
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Code Style

- We use **ESLint** for code linting
- We use **TypeScript** for type safety
- Follow **React** and **Next.js** best practices
- Use **Tailwind CSS** for styling (no custom CSS unless necessary)

### Running Linter

```bash
npm run lint
```

### Building the Project

```bash
npm run build
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── store/           # Redux store and RTK Query
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and providers
├── types/           # TypeScript type definitions
└── constants/       # Application constants
```

## Component Guidelines

### Creating New Components

1. **Location**: Place components in appropriate subdirectories:
   - `components/ui/` - Reusable UI components
   - `components/layout/` - Layout components (Header, Footer, etc.)
   - `components/news/` - News-specific components
   - `components/search/` - Search-related components
   - `components/common/` - Common utility components

2. **Naming**: Use PascalCase for component names (e.g., `NewsCard.tsx`)

3. **Structure**:
   ```tsx
   import React from 'react';
   
   interface ComponentProps {
     // Define props
   }
   
   export function Component({ prop1, prop2 }: ComponentProps) {
     return (
       // JSX
     );
   }
   ```

4. **TypeScript**: Always define prop types using TypeScript interfaces

5. **Accessibility**: Include ARIA labels and semantic HTML

## State Management

- Use **Redux Toolkit** for global state
- Use **RTK Query** for API calls
- Use React hooks for local component state
- Keep state as local as possible

## Styling Guidelines

- Use **Tailwind CSS** utility classes
- Follow the existing color scheme
- Support both light and dark modes
- Ensure responsive design (mobile-first)

## Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Ensure accessibility
   - Test your changes

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Guidelines

- Provide a clear description of changes
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed
- Add screenshots for UI changes

## Bug Reports

When reporting bugs, please include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/environment details
- Screenshots if applicable

## Feature Requests

When suggesting features:
- Clearly describe the feature
- Explain why it would be useful
- Provide examples if possible

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
