# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot module replacement (HMR)
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Architecture

This is a React + Vite single-page application with the following structure:

- **Entry Point**: `src/main.jsx` - Creates React root and renders the main App component
- **Main Component**: `src/App.jsx` - Root application component
- **Styling**: CSS files in `src/` (App.css, index.css) using standard CSS
- **Assets**: Static assets in `src/assets/` and `public/`
- **Build Tool**: Vite handles bundling, development server, and HMR

## Code Standards

- **ESLint Configuration**: Uses modern ESLint flat config with React-specific rules
- **React Patterns**: Functional components with hooks (React 19.1.1)
- **File Extensions**: Use `.jsx` for React components
- **Import Style**: ES modules with explicit file extensions for local imports

## Key Technologies

- **React 19.1.1**: Latest React with modern patterns
- **Vite 7.1.2**: Fast build tool with native ES modules
- **ESLint**: Code quality with React hooks and refresh plugins
- **Module Type**: Project uses ES modules (`"type": "module"` in package.json)