# NaturPrime E-Commerce Platform

## Overview

NaturPrime is a Turkish-language e-commerce platform built with a modern React frontend and Express backend. The application features a dark, premium aesthetic with gold accent colors, designed for selling health/wellness products. The platform includes product catalog browsing, shopping cart functionality with localStorage persistence, checkout flow, and customer reviews.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, localStorage for cart persistence
- **Styling**: Tailwind CSS with custom dark theme (HSL color system)
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API Design**: RESTful endpoints defined in shared route definitions
- **Schema Validation**: Zod with drizzle-zod integration

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level page components
│   │   ├── hooks/        # Custom React hooks (useProducts, useReviews, etc.)
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between frontend/backend
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route type definitions
```

### Data Flow
1. Frontend uses custom hooks (e.g., `useProducts`) that wrap React Query
2. React Query fetches from Express API endpoints
3. Express routes use the `storage` interface to query PostgreSQL via Drizzle ORM
4. Cart data persists in localStorage (`np_cart_items`, `np_cart_count`)

### Key Design Patterns
- **Repository Pattern**: `DatabaseStorage` class abstracts database operations
- **Type Safety**: Shared schema types between frontend and backend via `@shared/*` import alias
- **API Contract**: Route definitions in `shared/routes.ts` define expected request/response shapes

## External Dependencies

### Database
- **PostgreSQL**: Primary data store (configured via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations
- **Drizzle Kit**: Database migration tooling (`db:push` command)

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI primitives (dialogs, accordions, dropdowns, etc.)
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Full-stack type safety

### Payment Integration (Referenced in Assets)
- **Wert.io / MoonPay**: Crypto payment widgets for membership packages (USDT on Binance Smart Chain)
- Wallet address and fiat amounts pre-configured in attached HTML templates

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay during development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner