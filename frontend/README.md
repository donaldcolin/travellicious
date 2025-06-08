# Travelicious Frontend

This directory contains the frontend application for Travelicious, a travel and adventure booking platform built with React.

## Tech Stack

- **React**: UI library
- **React Router**: For client-side routing
- **Framer Motion**: For animations and transitions
- **Tailwind CSS**: For styling
- **Axios**: For API requests
- **Vite**: Build tool and development server

## Directory Structure

The project follows a professional, scalable architecture. See [FOLDER_STRUCTURE.md](./src/FOLDER_STRUCTURE.md) for details about the organization.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Features

- Responsive design for mobile and desktop
- Animation-enhanced user experience
- Product browsing and filtering
- User authentication and authorization
- Cart and checkout functionality
- Form validation

## Development Guidelines

- Use functional components and hooks
- Follow the established folder structure
- Write meaningful comments for complex logic
- Use named exports for components
- Add JSDoc comments for functions
- Keep components small and focused on a single responsibility
- Use Tailwind for styling, with custom CSS only when necessary

## Code Quality

- Format code with Prettier
- Follow ESLint rules
- Write tests for critical components
- Perform code reviews before merging

## Performance Considerations

- Lazy load components where appropriate
- Use memoization to prevent unnecessary renders
- Optimize images with Cloudinary or similar services
- Use code splitting for larger bundles

## Deployment

The production build can be deployed to Netlify, Vercel, or any static hosting service.
