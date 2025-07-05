# Gyro Compass Application

## Overview

This is a full-stack web application built with React and Express that features an interactive gyro compass component. The application simulates a nautical compass with real-time heading controls, auto-rotation capabilities, and a clean maritime-themed interface. The project uses a modern tech stack with TypeScript throughout, Drizzle ORM for database operations, and shadcn/ui components for the user interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks and TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom nautical color scheme and CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for fast production bundling
- **Storage**: In-memory storage implementation with interface for future database integration

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definition in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (configured but not yet implemented)

## Key Components

### Gyro Compass Component
The main feature of the application is an interactive gyro compass that provides:
- Real-time heading display with 360-degree rotation
- Manual heading input via text field and slider controls
- Preset heading buttons for common directions (N, S, E, W, etc.)
- Auto-rotation functionality with configurable speed
- Visual degree markings with major and minor tick marks
- Responsive design that works on desktop and mobile devices

### UI Component System
- Complete shadcn/ui component library including buttons, inputs, cards, dialogs, and more
- Custom nautical color scheme with CSS variables for theming
- Responsive design with mobile-first approach
- Accessible components built on Radix UI primitives

### Storage Interface
- Abstract storage interface (IStorage) for CRUD operations
- In-memory implementation for development
- Ready for database integration with user management schema
- Type-safe operations with Drizzle ORM integration

## Data Flow

1. **Client Interaction**: User interacts with compass controls (input, slider, buttons)
2. **State Updates**: React state manages current heading and auto-rotation status
3. **Visual Updates**: CSS transforms rotate the compass dial based on heading state
4. **Auto-rotation**: Optional timer-based automatic heading updates
5. **Future API Integration**: Ready for server-side heading persistence and user sessions

## External Dependencies

### Core Framework Dependencies
- React 18 ecosystem (react-dom, react-router via wouter)
- Express.js with TypeScript support
- Vite for development and build tooling

### Database & ORM
- Drizzle ORM with PostgreSQL dialect
- Neon Database serverless connector
- Zod for schema validation and type inference

### UI & Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible components
- Lucide React for consistent iconography
- Class Variance Authority for component variants

### Development Tools
- TypeScript for type safety across the stack
- ESBuild for fast production builds
- tsx for TypeScript development execution
- PostCSS with Autoprefixer for CSS processing

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with nodemon-like auto-restart
- **Database**: Local PostgreSQL or Neon development database
- **Environment**: NODE_ENV=development with debug logging

### Production
- **Build Process**: 
  1. Vite builds optimized frontend bundle to `dist/public`
  2. esbuild bundles backend TypeScript to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files
- **Database**: Neon PostgreSQL with connection pooling
- **Environment**: NODE_ENV=production with error handling and logging

### Replit Integration
- Custom Vite plugins for Replit development environment
- Runtime error overlay for debugging
- Cartographer integration for code exploration
- Replit-specific banner and development tools

## Changelog

Changelog:
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.