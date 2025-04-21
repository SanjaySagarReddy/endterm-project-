# Chef's Choice

A modern web application for discovering and exploring recipes from around the world.



## Features

- **Search Functionality**: Find recipes by ingredients, cuisine types, or dietary preferences
- **Recipe Collection**: Browse through 1000+ recipes across 50+ cuisines
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile devices
- **Category Filtering**: Quickly access popular categories like Italian, Asian, Vegetarian, and more
- **Favorites System**: Save and manage your favorite recipes

## Tech Stack

- **Frontend**: React 19 with React Router for navigation
- **Styling**: CSS with custom animations and responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Management**: npm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/recipe-finder.git
   cd recipe-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your API keys (if needed):
   ```
   VITE_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
/src
  /assets        # Images, icons, and other static files
  /components    # Reusable UI components
  /pages         # Application pages/routes
  /recipe        # Recipe-related logic and context
  /services      # API services and utilities
  /styles        # Global and component-specific styles
  App.jsx        # Main application component
  main.jsx       # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe data provided by [TheMealDB API](https://www.themealdb.com/api.php)
- UI design inspiration from [Blank UI Kit](https://blank.org)
